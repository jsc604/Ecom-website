import { NextResponse } from "next/server";
import db from "@/utils/db";
import Product from "@/models/Product";
import Reviews from "@/models/Reviews";

interface RequestContext {
  params: { slug: string };
}

export async function GET(_req: Request, { params }: RequestContext) {
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug });
  const reviews = await Reviews.find({ itemId: product._id });
  await db.disconnect();

  if (!product) {
    throw new Error("Product does not exist");
  }

  return NextResponse.json({ product, reviews: reviews.reverse() });
}
