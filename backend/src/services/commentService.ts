// src/services/commentService.ts
import { prisma } from "../config/db.js";

export const getComments = async (taskId: string) => {
  return prisma.task_comments.findMany({
    where: { task_id: taskId },
    orderBy: { created_at: "asc" },
    include: { users: true }
  });
};

export const addComment = async (taskId: string, content: string, userId: string) => {
  return prisma.task_comments.create({
    data: {
      task_id: taskId,
      author_id: userId,
      content
    },
    include: { users: true }
  });
};
