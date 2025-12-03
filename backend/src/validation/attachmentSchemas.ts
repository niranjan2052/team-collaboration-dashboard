// src/validation/attachmentSchemas.ts
import { z } from "zod";

export const uploadAttachmentSchema = z.object({
  params: z.object({
    taskId: z.string(),
  }),
});

export const deleteAttachmentSchema = z.object({
  params: z.object({
    attachmentId: z.string(),
  }),
});
