import Order from "@/models/Order";
import { isAuth } from "@/utils/auth";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: RequestContext) {
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

  const { id } = params;

  await db.connect();
  const orders = await Order.find({user: id});
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
