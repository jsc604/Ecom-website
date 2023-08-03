import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { isAuth } from "@/utils/auth";
import { ItemInfo } from "@/app/cart/page";

interface RequestContext {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: RequestContext) {
  const { id } = params;
  let user = null;
  if (req.headers.get("authorization")) {
    user = await isAuth(req);
  }

  if (id.length !== 24) {
    return NextResponse.json(
      {
        message: "Invalid order number!",
      },
      {
        status: 400,
      }
    );
  }

  await db.connect();
  const order = await Order.findById(id);

  if (!order) {
    return NextResponse.json(
      {
        message: "Order not found!",
      },
      {
        status: 404,
      }
    );
  }
  
  if (!user?.isAdmin) {
    if (
      (order.user && !user) ||
      (order.user && user && user._id !== order.user.toString())
    ) {
      return NextResponse.json(
        {
          message: "You do not have access to this order!",
        },
        {
          status: 401,
        }
      );
    }
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
