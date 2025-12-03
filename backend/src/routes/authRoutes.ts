// src/routes/authRoutes.ts
import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { asyncHandler } from "./../middleware/asynchandler.js";
import { registerSchema } from "../validation/authSchemas.js";

const router = Router();

// Public routes
router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register
);
router.post("/login", asyncHandler(authController.login));
router.post("/refresh", authController.refreshToken);

// Protected route
router.get("/me", authMiddleware, authController.me);

export default router;
