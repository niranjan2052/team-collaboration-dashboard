// src/controllers/taskController.ts
import type { Request, Response, NextFunction } from "express";
import * as taskService from "../services/taskService.js";

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await taskService.getTasks(req.params.projectId || "");
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await taskService.createTask(
      req.params.projectId || "",
      req.body
    );
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await taskService.updateTask(
      req.params.taskId || "",
      req.body
    );
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const moveTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedTask = await taskService.moveTask(
      req.params.taskId || "",
      req.body
    );
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await taskService.deleteTask(req.params.taskId || "");
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
