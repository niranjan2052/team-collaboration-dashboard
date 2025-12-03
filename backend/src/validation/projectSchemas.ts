// src/validation/projectSchemas.ts
import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().optional(),
  }),
});

export const updateProjectSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional(),
  }),
  params: z.object({
    projectId: z.string(),
  }),
});

export const addMemberSchema = z.object({
  params: z.object({
    projectId: z.string(),
  }),
  body: z.object({
    userId: z.string(),
    role: z.enum(["OWNER", "ADMIN", "MEMBER"]).optional(),
  }),
});

export const projectIdParamSchema = z.object({
  params: z.object({
    projectId: z.string(),
  }),
});
