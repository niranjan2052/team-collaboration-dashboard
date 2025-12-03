// src/controllers/authController.ts
import type { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService.js";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.refresh(req.body.refreshToken);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const me = async (req: Request, res: Response) => {
  // user is attached by authMiddleware
  // @ts-ignore
  res.json({ user: req.user });
};
