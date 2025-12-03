// src/routes/taskRoutes.ts
import { Router } from "express";
import * as taskController from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

// Create a new task
router.post("/project/:projectId", taskController.createTask);

// Get tasks for a project
router.get("/project/:projectId", taskController.getTasks);

// Update task
router.put("/:taskId", taskController.updateTask);

// Move task between columns
router.patch("/:taskId/move", taskController.moveTask);

// Delete task
router.delete("/:taskId", taskController.deleteTask);

export default router;
