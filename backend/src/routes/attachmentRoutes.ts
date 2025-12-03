// src/routes/attachmentRoutes.ts
import { Router } from "express";
import multer from "multer";
import * as attachmentController from "../controllers/attachmentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
const upload = multer({ dest: "temp/" }); // temporary before S3 upload

router.use(authMiddleware);

// Upload an attachment
router.post("/:taskId", upload.single("file"), attachmentController.uploadAttachment);

// Delete attachment
router.delete("/:attachmentId", attachmentController.deleteAttachment);

export default router;
