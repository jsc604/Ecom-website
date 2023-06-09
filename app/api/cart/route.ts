import { ItemOptions } from "@/app/components/ProductItem";
import Product from "@/models/Product";
import { CartItems } from "@/utils/StoreProvider";
import db from "@/utils/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("cartItems");
  const cartItems = token && JSON.parse(token.value);

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
