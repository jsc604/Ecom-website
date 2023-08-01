import User from "@/models/User";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { isAuth, signToken } from "@/utils/auth";

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { name, email, password } = data;
  const user = await isAuth(req);

  if (!name || !email) {
    return NextResponse.json(
      {
        message: "Name and email are required!",
      },
      {
        status: 400,
      }
    );
  }

  await db.connect();

  const existingUser = await User.findById(user._id);
  if (!existingUser) {
    await db.disconnect();
    return NextResponse.json(
      {
        message: "User not found!",
      },
      {
        status: 401,
      }
    );
  }

  existingUser.name = name;
  existingUser.email = email;

  if (password) {
    existingUser.password = bcrypt.hashSync(password);
  }

  await existingUser.save();
  await db.disconnect();

  const token = signToken(existingUser);
  return NextResponse.json({
    token,
    _id: existingUser._id,
    name: existingUser.name,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
  });
}
