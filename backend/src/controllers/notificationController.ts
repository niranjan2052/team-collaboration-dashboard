// src/controllers/notificationController.ts
import type { Request, Response, NextFunction } from "express";
import * as notificationService from "../services/notificationService.js";

export const getNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const notifications = await notificationService.getNotifications(userId);
    res.json(notifications);
  } catch (err) {
    next(err);
  }
};

export const markAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params?.notificationId || "";
    const notif = await notificationService.markAsRead(id);
    res.json(notif);
  } catch (err) {
    next(err);
  }
};
