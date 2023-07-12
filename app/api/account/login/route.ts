import User from "@/models/User";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/utils/auth";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email, password } = data;

  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = signToken(user);
    return NextResponse.json({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    return NextResponse.json(
      {
        message: "Invalid email or password",
      },
      {
        status: 401,
      }
    );
  }
}
