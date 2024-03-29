import { NextRequest, NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";
import { data } from "@/utils/data";
import db from "@/utils/db";
import Product from "@/models/Product";
import User from "@/models/User";
import Order from "@/models/Order";
import Reviews from "@/models/Reviews";

interface RequestContext {}

const handler = createEdgeRouter<NextRequest, RequestContext>();

handler.get(async () => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await Order.deleteMany();
  await Reviews.deleteMany();
  await db.disconnect();
  return NextResponse.json({message: 'seeded successfully'});
});

export async function GET(request: NextRequest, ctx: RequestContext) {
  return handler.run(request, ctx);
}