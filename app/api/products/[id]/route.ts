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
  const product = await Product.findById(id);
  await db.disconnect();
  return NextResponse.json(product);
});

handler.post(async (request, _ctx) => {
  const { cart } = await request.json();
  console.log("cart: ", cart);

  return NextResponse.json({ success: true });
});

export async function GET(request: NextRequest, ctx: RequestContext) {
  return handler.run(request, ctx);
}

export async function POST(request: NextRequest, ctx: RequestContext) {
  return handler.run(request, ctx);
}
