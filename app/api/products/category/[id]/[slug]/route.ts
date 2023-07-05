import { NextRequest, NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import Product from "@/models/Product";
import db from "@/utils/db";

interface RequestContext {
  params: { slug: string };
}

const handler = createEdgeRouter<NextRequest, RequestContext>();

handler.get(async (_request, ctx) => {
  const { params } = ctx;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  if (!product) {
    throw new Error("Category does not exist");
  }

  return NextResponse.json(product);
});

export async function GET(request: NextRequest, ctx: RequestContext) {
  return handler.run(request, ctx);
}