// src/middleware/errorHandler.ts
import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err);

  const status = err.statusCode || 500;

  res.status(status).json({
    status,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};
