import User from "@/models/User";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { isAuth } from "@/utils/auth";
import Order from "@/models/Order";
import Product from "@/models/Product";

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
  const ordersCount = await Order.countDocuments();
  const productsCount = await Product.countDocuments();
  const usersCount = await User.countDocuments();
  const ordersPriceGroup = await Order.aggregate([
    {
      $group: {
        _id: null,
        sales: { $sum: "$totalPrice" },
      },
    },
  ]);
  const ordersPrice =
    ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;

  // const salesData = await Order.aggregate([
  //   {
  //     $group: {
  //       _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
  //       totalSales: { $sum: "$totalPrice" },
  //     },
  //   },
  // ]);

  await db.disconnect();

  return NextResponse.json({
    ordersCount,
    productsCount,
    usersCount,
    ordersPrice,
  });
}
