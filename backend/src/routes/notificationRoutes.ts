// src/routes/notificationRoutes.ts
import { Router } from "express";
import * as notificationController from "../controllers/notificationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

// Get all notifications for user
router.get("/", notificationController.getNotifications);

// Mark notification as read
router.patch("/:notificationId/read", notificationController.markAsRead);

export default router;
