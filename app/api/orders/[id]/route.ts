import { NextResponse } from "next/server";
import db from "@/utils/db";
import Order from "@/models/Order";

interface RequestContext {
  params: { id: string };
}

export async function GET(_req: Request, { params }: RequestContext) {
  const { id } = params;
  await db.connect();
  const order = await Order.findById(id);
  await db.disconnect();

  if (!order) {
    throw new Error("Order not found");
  }

  return NextResponse.json(order);
}
