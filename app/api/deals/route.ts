import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Deals from "@/models/Deals";
import { isAuth } from "@/utils/auth";

export async function GET() {
  await db.connect();
  const deals = await Deals.find({});
  await db.disconnect();

  deals.filter((deal) => deal.image && deal.link);

  return NextResponse.json(deals);
}

export async function POST(req: NextRequest) {
  const user = await isAuth(req);

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

  const deals = await req.json();

  await db.connect();

  for (const deal of deals) {
    const existingDeal = await Deals.findOne({ dealNum: deal.dealNum });

    if (existingDeal) {
      await Deals.updateOne(
        { dealNum: deal.dealNum },
        {
          $set: {
            dealNum: deal.dealNum,
            image: deal.image,
            link: deal.link,
          },
        }
      );
    } else {
      const newDeal = new Deals({
        dealNum: deal.dealNum,
        image: deal.image,
        link: deal.link,
      });

      await newDeal.save();
    }
  }

  await db.disconnect();

  return NextResponse.json({ message: "Deals updated" });
}
