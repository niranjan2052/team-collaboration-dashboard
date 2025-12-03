// src/services/taskService.ts
import { prisma } from "../config/db.js";
import ActivityLog from "../mongo/activityLogModel.js";

export const getTasks = async (projectId: string) => {
  return prisma.tasks.findMany({
    where: { project_id: projectId },
    orderBy: { position: "asc" }
  });
};

export const createTask = async (projectId: string, data: any) => {
  const column = await prisma.task_columns.findFirst({
    where: { project_id: projectId },
    orderBy: { position: "asc" }
  });

  if (!column) throw new Error("No columns found");

  const task = await prisma.tasks.create({
    data: {
      title: data.title,
      description: data.description,
      project_id: projectId,
      column_id: column.id,
      position: 9999
    }
  });

  await ActivityLog.create({
    projectId,
    userId: data.userId,
    type: "TASK_CREATED",
    payload: { taskId: task.id }
  });

  return task;
};

export const updateTask = async (taskId: string, data: any) => {
  return prisma.tasks.update({
    where: { id: taskId },
    data
  });
};

export const moveTask = async (taskId: string, data: any) => {
  const { toColumnId, newPosition } = data;

  return prisma.tasks.update({
    where: { id: taskId },
    data: {
      column_id: toColumnId,
      position: newPosition
    }
  });
};

export const deleteTask = async (taskId: string) => {
  await prisma.tasks.delete({ where: { id: taskId } });
};
