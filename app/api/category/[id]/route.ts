import { NextRequest, NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import Product from "@/models/Product";
import db from "@/utils/db";

interface RequestContext {
  params: { id: string };
}

const handler = createEdgeRouter<NextRequest, RequestContext>();

handler.get(async (_request, ctx) => {
  const { params } = ctx;
  const { id } = params;
  await db.connect();
  const products = await Product.find({ category: id });
  await db.disconnect();

  if (products.length === 0) {
    throw new Error("Category does not exist");
  }

  return NextResponse.json(products);
});

export async function GET(request: NextRequest, ctx: RequestContext) {
  return handler.run(request, ctx);
}