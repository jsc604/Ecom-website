import { NextResponse } from "next/server";

import Product from "@/models/Product";
import db from "@/utils/db";

interface RequestContext {
  params: { category: string };
}

export async function GET(_req: Request, { params }: RequestContext) {
  const { category } = params;
  await db.connect();
  const products = await Product.find({ category });
  await db.disconnect();

  if (products.length === 0) {
    throw new Error("Category does not exist");
  }

  return NextResponse.json(products);
}