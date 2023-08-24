import Order from "@/models/Order";
import User from "@/models/User";
import { isAuth } from "@/utils/auth";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export interface OrderCounts {
  [userId: string]: number;
}

export async function GET(req: NextRequest) {
  const user = await isAuth(req);

  if (!user.isAdmin) {
    return NextResponse.json(
      {
        message: "Authororization required!",
      },
      {
        status: 401,
      }
    );
  }

  await db.connect();
  const users = await User.find({});
  const orders = await Order.find({});
  await db.disconnect();

  if (users.length < 1) {
    return NextResponse.json(
      {
        message: "Sorry, no orders found!",
      },
      {
        status: 404,
      }
    );
  }

  // Create a dictionary to store order counts for each user
  const orderCounts: OrderCounts = {};

  // Count orders for each user
  orders.forEach((order) => {
    if (order.user) {
      if (!orderCounts[order.user.toString()]) {
        orderCounts[order.user.toString()] = 1;
      } else {
        orderCounts[order.user.toString()]++;
      }
    }
  });

  return NextResponse.json({ users, orderCounts });
}
