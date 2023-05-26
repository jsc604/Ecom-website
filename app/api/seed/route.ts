import { NextRequest, NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";
import { data } from "@/utils/data";

interface RequestContext {
 
}

const handler = createEdgeRouter<NextRequest, RequestContext>();

handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await db.disconnect();
  return NextResponse.json({message: 'seeded successfully'});
});

export async function GET(request: NextRequest, ctx: RequestContext) {
  return handler.run(request, ctx);
}