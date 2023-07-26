import { NextResponse } from "next/server";
import db from "@/utils/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { ItemInfo } from "@/app/cart/CartContainer";

interface RequestContext {
  params: { id: string };
}

export async function GET(req: Request, { params }: RequestContext) {
  const { id } = params;
  await db.connect();
  const order = await Order.findById(id);

  if (!order) {
    throw new Error("Order not found");
  }

  // Fetch all product objects concurrently
  const productIds = order.orderItems.map((item: ItemInfo) => item.product);
  const productObjects = await Promise.all(
    productIds.map((productId: string) => Product.findById(productId))
  );

  // Replace product ids with actual product objects in orderItems
  order.orderItems.forEach((item: ItemInfo, index: number) => {
    item.product = productObjects[index];
  });

  await db.disconnect();

  return NextResponse.json(order);
}
