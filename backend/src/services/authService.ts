// src/services/authService.ts
import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";

export const register = async (data: any) => {
  const { name, email, password } = data;

  const exists = await prisma.users.findUnique({ where: { email } });
  if (exists) throw new Error("Email already registered");

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      name,
      email,
      password_hash: hash
    }
  });

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user.id);

  return { user, accessToken, refreshToken };
};

export const login = async (data: any) => {
  const { email, password } = data;

  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("Invalid credentials");

  return {
    user,
    accessToken: signAccessToken(user),
    refreshToken: signRefreshToken(user.id)
  };
};

export const refresh = async (token: string) => {
  const decodedUserId = verifyRefreshToken(token);

  const user = await prisma.users.findUnique({
    where: { id: decodedUserId }
  });

  if (!user) throw new Error("Invalid refresh token");

  return {
    accessToken: signAccessToken(user)
  };
};
