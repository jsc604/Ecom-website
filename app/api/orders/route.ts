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
