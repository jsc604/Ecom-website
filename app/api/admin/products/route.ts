import Product from "@/models/Product";
import { isAuth } from "@/utils/auth";
import db from "@/utils/db";
import { convertToHyphenatedLowerCase } from "@/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const caller = await isAuth(req);

  if (!caller.isAdmin) {
    return NextResponse.json(
      {
        message: "Unauthorized access!",
      },
      {
        status: 401,
      }
    );
  }

  const data = await req.json();
  const { id } = data;

  await db.connect();

  const product = await Product.findById(id);

  if (product) {
    await Product.deleteOne({ _id: id });
    await db.disconnect();

    return NextResponse.json({ message: "Product deleted!" });
  } else {
    await db.disconnect();

    return NextResponse.json(
      {
        message: "Product not found!",
      },
      {
        status: 404,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  const caller = await isAuth(req);

  if (!caller.isAdmin) {
    return NextResponse.json(
      {
        message: "Unauthorized access!",
      },
      {
        status: 401,
      }
    );
  }

  const data = await req.json();
  const {
    name,
    category,
    brand,
    images,
    isFeatured,
    featuredImage,
    options,
    description,
  } = data;

  await db.connect();

  const newProduct = new Product({
    name,
    slug: convertToHyphenatedLowerCase(name),
    category,
    brand,
    images,
    isFeatured,
    featuredImage,
    options,
    description,
  });

  await newProduct.save();

  await db.disconnect();
  return NextResponse.json({ message: "Product created!" });
}
