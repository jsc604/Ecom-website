import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { UserInfo } from "./StoreProvider";

type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

const secret = process.env.JWT_SECRET || '';

const signToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    secret,
    { expiresIn: "30d" }
  );
};

async function isAuth(req: NextRequest): Promise<UserInfo> {
  const authorization = req.headers.get("authorization");
  const secret = process.env.JWT_SECRET || "";

  if (!authorization) {
    throw new Error("Token is not supplied");
  }

  const token = authorization.slice(7);
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(new Error("Token is not valid"));
      } else {
        resolve(decoded as UserInfo);
      }
    });
  });
}

export { signToken, isAuth };
