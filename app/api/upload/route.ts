import { isAuth } from "@/utils/auth";
import { connectToDb, disconnectFromDb, fileExists } from "@/utils/mongo";
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";

export async function POST(req: NextRequest) {
  const user = await isAuth(req);

  if (!user) {
    return NextResponse.json(
      {
        message: "No user found!",
      },
      {
        status: 401,
      }
    );
  }

  if (!user.isAdmin) {
    return NextResponse.json(
      {
        message: "Authororization required!",
      },
      {
        status: 401,
      }
    );
  }

  const { bucket } = await connectToDb();

  const data = await req.formData();

  for (const entry of Array.from(data.entries())) {
    const [key, value] = entry;

    const isFile = typeof value == "object";

    if (isFile) {
      const blob = value as Blob;
      const filename = blob.name;

      const existing = await fileExists(filename);
      if (existing) {
        continue;
      }

      const buffer = Buffer.from(await blob.arrayBuffer());
      const stream = Readable.from(buffer);

      const uploadStream = bucket.openUploadStream(filename, {
        contentType: blob.type,
        metadata: {},
      });

      stream.pipe(uploadStream);
    }
  }

  await disconnectFromDb();
  return NextResponse.json({ success: true });
}
