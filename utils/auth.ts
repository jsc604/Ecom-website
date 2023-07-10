import jwt from "jsonwebtoken";

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

export { signToken };
