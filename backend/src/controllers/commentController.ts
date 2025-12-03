// src/controllers/commentController.ts
import type { Request, Response, NextFunction } from "express";
import * as commentService from "../services/commentService.js";

export const getComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await commentService.getComments(req.params.taskId || "");
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const comment = await commentService.addComment(
      req.params.taskId || "",
      req.body.content,
      userId
    );
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};
