import { NextResponse } from "next/server";
import Product from "@/models/Product";
import db from "@/utils/db";

interface RequestContext {
  params: { id: string };
}

export async function GET(_req: Request, { params }: RequestContext) {
  const { id } = params;
  await db.connect();
  const product = await Product.findById(id);
  await db.disconnect();

  if (!product) {
    throw new Error("Product not found");
  }

  return NextResponse.json(product);
}
