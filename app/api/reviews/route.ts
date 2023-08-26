import Product from "@/models/Product";
import Reviews from "@/models/Reviews";
import { UserInfo } from "@/utils/StoreProvider";
import { isAuth } from "@/utils/auth";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export async function GET(req: NextRequest) {
  const itemId = JSON.parse(req.nextUrl.searchParams.get("itemId") as string);

  if (!itemId) {
    return NextResponse.json(
      {
        message: "Invalid input",
      },
      {
        status: 400,
      }
    );
  }

  await db.connect();

  const reviews = await Reviews.find({ itemId });

  await db.disconnect();

  return NextResponse.json(reviews.reverse());
}

export async function POST(req: NextRequest) {
  let user: UserInfo | null = null;
  if (req.headers.get("authorization")) {
    user = await isAuth(req);
  }

  const { comment, userRating, itemId, name } = await req.json();

  await db.connect();

  const itemReviews = await Reviews.find({ itemId });
  const product = await Product.findById(itemId);

  const existingReview = user
    ? itemReviews.find((review) => review.user.equals(new ObjectId(user?._id)))
    : null;

  if (existingReview) {
    await Reviews.updateOne(
      { itemId, user: user?._id },
      {
        $set: {
          comment,
          rating: userRating as number,
        },
      }
    );

    const updatedReviews = await Reviews.find({ itemId });

    const totalRating = updatedReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRating / updatedReviews.length;

    await Product.updateOne(
      { _id: itemId },
      { $set: { rating: averageRating } }
    );

    await db.disconnect();

    return NextResponse.json({
      message: "Review updated! Thanks for your feedback!",
    });
  } else {
    const newReview = new Reviews({
      itemId,
      user: user?._id,
      name: user ? user.name : name,
      rating: userRating as number,
      comment,
    });
    await newReview.save();

    const updatedReviews = await Reviews.find({ itemId });

    const totalRating = updatedReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRating / updatedReviews.length;

    await Product.updateOne(
      { _id: itemId },
      {
        $set: {
          rating: averageRating,
        },
        $inc: { numReviews: 1 },
      }
    );
    await product.save();
    await db.disconnect();

    return NextResponse.json({
      message: "Review submitted! Thanks for your feedback!",
    });
  }
}
