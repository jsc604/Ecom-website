
import db from "@/utils/db";
import { connectToDb } from "@/utils/mongo";
import { NextResponse } from "next/server";

type Params = {
  params: { filename: string };
};

export async function GET(req: Request, { params }: Params) {

  const filename = params.filename as string;

  if (!filename) {
    return new NextResponse(null, { status: 400, statusText: "Bad Request" });
  }

  const { bucket } = await connectToDb();

  const files = await bucket.find({ filename }).toArray();
  if (!files.length) {
    await db.disconnect();
    return new NextResponse(null, { status: 404, statusText: "Not found" });
  }

  const file = files.at(0)!;

  // Force the type to be ReadableStream since NextResponse doesn't accept GridFSBucketReadStream
  const stream = bucket.openDownloadStreamByName(
    filename
  ) as unknown as ReadableStream;

  await db.disconnect();

  return new NextResponse(stream, {
    headers: {
      "Content-Type": file.contentType!,
    },
  });
}