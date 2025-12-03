// src/controllers/attachmentController.ts
import type { Request, Response, NextFunction } from "express";
import * as attachmentService from "../services/attachmentService.js";

export const uploadAttachment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.file;
    if (!file) throw new Error("File is required");

    const taskId = req.params.taskId || req.body.taskId || "";

    // @ts-ignore
    const userId = req.user.id;

    const attachment = await attachmentService.uploadAttachment(
      taskId,
      file,
      userId
    );

    res.status(201).json(attachment);
  } catch (err) {
    next(err);
  }
};

export const deleteAttachment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const attachmentId = req?.params?.attachmentId || "";
    await attachmentService.deleteAttachment(attachmentId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
