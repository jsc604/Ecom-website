import Order from "@/models/Order";
import { isAuth } from "@/utils/auth";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let user = null;
  if (req.headers.get("authorization")) {
    user = await isAuth(req);
  }
  const data = await req.json();

  await db.connect();
  const newOrder = new Order({
    ...data,
    user: user ? user._id : null,
  });
  const order = await newOrder.save();
  await db.disconnect();

  return NextResponse.json(order, { status: 201 });
}

export async function GET(req: NextRequest) {
  let user = null;
  if (req.headers.get("authorization")) {
    user = await isAuth(req);
  }

  if (user === null) {
    return NextResponse.json(
      {
        message: "Please log in to view your order history!",
      },
      {
        status: 401,
      }
    );
  }

  await db.connect();
  const orders = await Order.find({ user: user._id });
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

  return NextResponse.json(orders);
}
