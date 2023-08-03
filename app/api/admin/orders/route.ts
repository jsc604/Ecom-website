import Order from "@/models/Order";
import { isAuth } from "@/utils/auth";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await isAuth(req);

  if (!user) {
    return NextResponse.json(
      {
        message: "No user found!",
      },
      {
        status: 401,
      }
    );
  }

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
  const orders = await Order.find({});
  await db.disconnect();

  if (orders.length < 1) {
    return NextResponse.json(
      {
        message: "Sorry, no orders found!",
      },
      {
        status: 404,
      }
    );
  }

  console.log(orders);
  return NextResponse.json(orders);
}
