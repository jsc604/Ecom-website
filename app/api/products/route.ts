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

  return NextResponse.json(products);
};