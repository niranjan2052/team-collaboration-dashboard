// src/middleware/authMiddleware.ts
import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ message: "Unauthorized" });

    const token = header.split(" ")[1] || "";

    const decoded = verifyAccessToken(token);
    // Attach user to req
    // @ts-ignore
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
