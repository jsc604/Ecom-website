import { ItemOptions } from "@/app/components/ProductItem";
import Product from "@/models/Product";
import { CartItems } from "@/utils/StoreProvider";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = req.cookies;
  const cartItems = cookieStore.get("cartItems")?.value;

  if (!cartItems) {
    return NextResponse.json(
      {
        message: "No items found in cart!",
      },
      {
        status: 404,
      }
    );
  }

  await db.connect();

  const productPromises = JSON.parse(cartItems).map(async (cartItem: CartItems) => {
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
