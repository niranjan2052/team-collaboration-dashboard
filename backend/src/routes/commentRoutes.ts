// src/routes/commentRoutes.ts
import { Router } from "express";
import * as commentController from "../controllers/commentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

// Add comment to a task
router.post("/:taskId", commentController.addComment);

// Get all comments for a task
router.get("/:taskId", commentController.getComments);

export default router;
