import User from "@/models/User";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/utils/auth";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { firstName, lastName, email, password } = data;
  console.log(data);

  await db.connect();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    await db.disconnect();
    return NextResponse.json(
      {
        message: "User already exists!",
      },
      {
        status: 400,
      }
    );
  }

  const newUser = new User({
    name: `${firstName} ${lastName}`,
    email,
    password: bcrypt.hashSync(password),
    isAdmin: false,
  });
  const user = await newUser.save();
  await db.disconnect();

  const token = signToken(user);
  return NextResponse.json({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
}
