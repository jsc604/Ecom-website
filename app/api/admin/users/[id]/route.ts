import User from "@/models/User";
import { isAuth } from "@/utils/auth";
import db from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

interface RequestContext {
  params: { id: string };
}

export async function DELETE(req: NextRequest, { params }: RequestContext) {
  const caller = await isAuth(req);

  if (!caller.isAdmin) {
    return NextResponse.json(
      {
        message: "Unauthorized access!",
      },
      {
        status: 401,
      }
    );
  }

  const { id } = params;

  await db.connect();

  const user = await User.findById(id);

  if (user) {
    await User.deleteOne({ _id: id });
    await db.disconnect();

    return NextResponse.json({ message: "User deleted!" });
  } else {
    await db.disconnect();

    return NextResponse.json(
      {
        message: "User not found!",
      },
      {
        status: 404,
      }
    );
  }
}

export async function GET(req: NextRequest, { params }: RequestContext) {
  const caller = await isAuth(req);
  const { id } = params;

  if (!caller.isAdmin) {
    return NextResponse.json(
      {
        message: "Unauthorized access!",
      },
      {
        status: 401,
      }
    );
  }

  await db.connect();

  const user = await User.findById(id);

  await db.disconnect();

  if (user) {
    return NextResponse.json(user);
  } else {
    return NextResponse.json(
      {
        message: "User not found!",
      },
      {
        status: 404,
      }
    );
  }
}

export async function PUT(req: NextRequest, { params }: RequestContext) {
  const caller = await isAuth(req);

  if (!caller.isAdmin) {
    return NextResponse.json(
      {
        message: "Unauthorized access!",
      },
      {
        status: 401,
      }
    );
  }

  const { id } = params;
  const data = await req.json();
  const { name, isAdmin } = data;

  await db.connect();

  const user = await User.findById(id);

  if (user) {
    user.name = name;
    user.isAdmin = Boolean(isAdmin);
    await user.save();
    await db.disconnect();

    return NextResponse.json({ message: "User Updated Successfully!" });
  } else {
    await db.disconnect();
    return NextResponse.json(
      {
        message: "User not found!",
      },
      {
        status: 404,
      }
    );
  }
}
