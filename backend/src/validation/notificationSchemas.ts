// src/validation/notificationSchemas.ts
import { z } from "zod";

export const markAsReadSchema = z.object({
  params: z.object({
    notificationId: z.string(),
  }),
});
