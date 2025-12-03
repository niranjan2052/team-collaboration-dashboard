// src/routes/index.ts
import { Router } from "express";

import authRoutes from "./authRoutes.js";
import projectRoutes from "./projectRoutes.js";
import taskRoutes from "./taskRoutes.js";
import commentRoutes from "./commentRoutes.js";
import attachmentRoutes from "./attachmentRoutes.js";
import notificationRoutes from "./notificationRoutes.js";

const router = Router();

// ---------- AUTH ----------
router.use("/auth", authRoutes);

// ---------- PROJECTS ----------
router.use("/projects", projectRoutes);

// ---------- TASKS ----------
// /projects/:projectId/tasks
// /tasks/:taskId
router.use("/", taskRoutes);

// ---------- COMMENTS ----------
// /tasks/:taskId/comments
router.use("/", commentRoutes);

// ---------- ATTACHMENTS ----------
// /tasks/:taskId/attachments
// /attachments/:attachmentId
router.use("/", attachmentRoutes);

// ---------- NOTIFICATIONS ----------
router.use("/notifications", notificationRoutes);

export default router;
