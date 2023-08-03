import Order from "@/models/Order";
import { isAuth } from "@/utils/auth";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const user = await isAuth(req);
  const { id } = await req.json();

  if (!user.isAdmin) {
    return NextResponse.json(
      {
        message: "Unauthorized access!",
      },
      {
        status: 401,
      }
    );
  }

  await db.connect();

  const order = await Order.findById(id);

  if (order) {
    order.isDelivered = !order.isDelivered;
    const updateDeliver = await order.save();
    await db.disconnect();

    return NextResponse.json({ order: updateDeliver });
  } else {
    await db.disconnect();

    return NextResponse.json(
      {
        message: "Order not found!",
      },
      {
        status: 404,
      }
    );
  }
}
