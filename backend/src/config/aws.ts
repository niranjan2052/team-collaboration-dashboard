// src/config/aws.ts
import AWS from "aws-sdk";

let s3: AWS.S3;

// Only initialize AWS if credentials exist
if (
  process.env.AWS_ACCESS_KEY &&
  process.env.AWS_SECRET_KEY &&
  process.env.AWS_REGION &&
  process.env.AWS_S3_BUCKET
) {
  s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });

  console.log("AWS S3 initialized");
} else {
  console.warn("⚠️ AWS S3 DISABLED — Missing environment variables");
  
  // Create a dummy object to prevent crashes
  s3 = {
    upload: () => ({
      promise: async () => {
        throw new Error("AWS S3 disabled — no credentials provided");
      }
    }),
    deleteObject: () => ({
      promise: async () => {
        throw new Error("AWS S3 disabled — no credentials provided");
      }
    })
  } as any;
}

export { s3 };
