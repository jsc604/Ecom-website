import { NextResponse } from "next/server";
import db from "@/utils/db";
import Deals from "@/models/Deals";

export async function GET() {
  await db.connect();
  const deals = await Deals.find({});
  await db.disconnect();

  return NextResponse.json(deals);
};