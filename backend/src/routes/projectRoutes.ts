// src/routes/projectRoutes.ts
import { Router } from "express";
import * as projectController from "../controllers/projectController.js";
import * as taskController from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { requireProjectMember } from "../middleware/requireProjectMember.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  addMemberSchema,
  createProjectSchema,
  updateProjectSchema,
} from "../validation/projectSchemas.js";

const router = Router();

router.use(authMiddleware);

// Get all projects for a user
router.get("/", projectController.getProjects);

// Create new project
router.post(
  "/",
  validateRequest(createProjectSchema),
  projectController.createProject
);

// Get single project details with board
router.get("/:projectId", projectController.getProjectById);

// Update project
router.put(
  "/:projectId",
  validateRequest(updateProjectSchema),
  projectController.updateProject
);

// Delete project
router.delete("/:projectId", projectController.deleteProject);

// Add member to project
router.post(
  "/:projectId/members",
  validateRequest(addMemberSchema),
  projectController.addMember
);

router.get(
  "/:projectId",
  requireProjectMember,
  projectController.getProjectById
);
router.post(
  "/:projectId/tasks",
  requireProjectMember,
  taskController.createTask
);

export default router;
