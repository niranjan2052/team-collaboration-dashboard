// src/utils/jwt.ts
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_EXPIRES_IN = "15m";
const REFRESH_EXPIRES_IN = "7d";

export const signAccessToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name
    },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES_IN }
  );
};

export const signRefreshToken = (userId: string) => {
  return jwt.sign(
    { id: userId },
    REFRESH_SECRET,
    { expiresIn: REFRESH_EXPIRES_IN }
  );
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET) as any;
};

export const verifyRefreshToken = (token: string) => {
  return (jwt.verify(token, REFRESH_SECRET) as any).id;
};
