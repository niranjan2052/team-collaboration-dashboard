// src/services/attachmentService.ts

import { prisma } from "../config/db.js";
import { s3 } from "../config/aws.js";
import fs from "fs";

const awsEnabled =
  process.env.AWS_ACCESS_KEY &&
  process.env.AWS_SECRET_KEY &&
  process.env.AWS_REGION &&
  process.env.AWS_S3_BUCKET;

export const uploadAttachment = async (
  taskId: string,
  file: any,
  userId: string
) => {
  // CLEANUP if AWS is not configured
  if (!awsEnabled) {
    if (file?.path) {
      fs.unlinkSync(file.path);
    }
    throw new Error("File upload disabled — AWS not configured");
  }

  const fileStream = fs.createReadStream(file.path);

  const uploadResult = await s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: `attachments/${Date.now()}-${file.originalname}`,
      Body: fileStream,
    })
    .promise();

  fs.unlinkSync(file.path);

  return prisma.attachments.create({
    data: {
      task_id: taskId,
      file_name: file.originalname,
      file_url: uploadResult.Location,
      file_size: file.size,
      mime_type: file.mimetype,
      uploaded_by: userId,
    },
  });
};

export const deleteAttachment = async (attachmentId: string) => {
  if (!awsEnabled) {
    throw new Error("Attachment deletion disabled — AWS not configured");
  }

  const attachment = await prisma.attachments.findUnique({
    where: { id: attachmentId },
  });

  if (!attachment) throw new Error("Attachment not found");

  // Extract key safely regardless of provider
  const url = new URL(attachment.file_url);
  const key = url.pathname.startsWith("/")
    ? url.pathname.slice(1) // remove leading "/"
    : url.pathname;

  await s3
    .deleteObject({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
    })
    .promise();

  await prisma.attachments.delete({
    where: { id: attachmentId },
  });
};
