// src/controllers/projectController.ts
import type { Request, Response, NextFunction } from "express";
import * as projectService from "../services/projectService.js";

export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const data = await projectService.getProjects(userId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const project = await projectService.createProject(req.body, userId);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await projectService.getProjectById(
      req.params.projectId || ""
    );
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const project = await projectService.updateProject(
      req.params.projectId || "",
      req.body
    );
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await projectService.deleteProject(req.params.projectId || "");
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const addMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const member = await projectService.addMember(
      req.params.projectId || "",
      req.body
    );
    res.json(member);
  } catch (err) {
    next(err);
  }
};
