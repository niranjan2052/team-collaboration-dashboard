// src/validation/taskSchemas.ts
import { z } from "zod";

export const createTaskSchema = z.object({
  params: z.object({
    projectId: z.string(),
  }),
  body: z.object({
    title: z.string().min(2),
    description: z.string().optional(),
    assigneeId: z.string().optional(),
  }),
});

export const updateTaskSchema = z.object({
  params: z.object({
    taskId: z.string(),
  }),
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    assigneeId: z.string().optional(),
    due_date: z.string().optional(),
  }),
});

export const moveTaskSchema = z.object({
  params: z.object({
    taskId: z.string(),
  }),
  body: z.object({
    toColumnId: z.string(),
    newPosition: z.number(),
  }),
});

export const deleteTaskSchema = z.object({
  params: z.object({
    taskId: z.string(),
  }),
});
