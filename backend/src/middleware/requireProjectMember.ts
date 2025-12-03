// src/middleware/requireProjectMember.ts
import type { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db.js";

export const requireProjectMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectId = req.params.projectId || req.body.projectId;

    if (!projectId)
      return res.status(400).json({ message: "Project ID is required" });

    // @ts-ignore
    const userId = req.user.id;

    const member = await prisma.project_members.findFirst({
      where: {
        project_id: projectId,
        user_id: userId
      }
    });

    if (!member)
      return res.status(403).json({ message: "Access to project denied" });

    next();
  } catch (err) {
    next(err);
  }
};
