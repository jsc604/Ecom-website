import { NextRequest, NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import Product from "@/models/Product";
import db from "@/utils/db";

interface RequestContext {};

const handler = createEdgeRouter<NextRequest, RequestContext>();

handler.get(async () => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  return NextResponse.json({products});
});

export async function GET(request: NextRequest, ctx: RequestContext) {
  return handler.run(request, ctx);
}