import { NextResponse } from "next/server";
import Product from "@/models/Product";
import db from "@/utils/db";

export async function GET() {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();

  if (!products) {
    throw new Error("Products not found");
  }

  const categories = products.reduce((accumulator, product) => {
    if (product.category && !accumulator.includes(product.category)) {
      accumulator.push(product.category);
    }
    return accumulator;
  }, []);

  return NextResponse.json(categories.sort((a: string, b: string) => a.trim().localeCompare(b.trim())));
};
