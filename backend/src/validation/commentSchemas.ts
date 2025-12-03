// src/validation/commentSchemas.ts
import { z } from "zod";

export const addCommentSchema = z.object({
  params: z.object({
    taskId: z.string(),
  }),
  body: z.object({
    content: z.string().min(1, "Comment cannot be empty"),
  }),
});

export const getCommentsSchema = z.object({
  params: z.object({
    taskId: z.string(),
  }),
});
