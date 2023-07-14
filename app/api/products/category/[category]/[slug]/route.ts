import { NextResponse } from "next/server";
import Product from "@/models/Product";
import db from "@/utils/db";

interface RequestContext {
  params: { slug: string };
}

export async function GET(_req: Request, { params }: RequestContext) {
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    throw new Error("Product does not exist");
  }

  return NextResponse.json(product);
}
