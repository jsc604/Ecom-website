import Product from "@/models/Product";
import { isAuth } from "@/utils/auth";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext {
  params: { id: string };
}

export async function PUT(req: NextRequest, { params }: RequestContext) {
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

  const { id } = params;
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

  const product = await Product.findById(id);

  if (product) {
    product.name = name;
    product.category = category;
    product.brand = brand;
    product.images = images;
    product.isFeatured = isFeatured;
    product.featuredImage = featuredImage;
    product.options = options;
    product.description = description;
    await product.save();
    await db.disconnect();

    return NextResponse.json({ message: "Product updated successfully!" });
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
