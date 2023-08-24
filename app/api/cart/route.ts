import { ItemOptions } from "@/app/components/ProductItem";
import Product from "@/models/Product";
import { CartItems } from "@/utils/StoreProvider";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cartItems = JSON.parse(
    req.nextUrl.searchParams.get("cartItems") as string
  );

  if (!cartItems || !Array.isArray(cartItems)) {
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

  const productPromises = cartItems.map(async (cartItem: CartItems) => {
    const { itemId, optionId, quantity } = cartItem;
    const product = await Product.findById(itemId);

    if (!product) {
      return null;
    }

    const optionIndex = product.options.findIndex(
      (option: ItemOptions) => option.size === optionId
    );

    return { product, optionIndex, quantity };
  });

  const products = await Promise.all(productPromises);

  await db.disconnect();

  return NextResponse.json(products);
}
