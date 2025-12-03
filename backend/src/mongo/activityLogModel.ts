// src/mongo/activityLogModel.ts
import mongoose, { Schema, Document } from "mongoose";

interface ActivityLog extends Document {
  projectId: string;
  userId: string;
  type: string;
  payload: any;
  createdAt: Date;
}

const activityLogSchema = new Schema<ActivityLog>(
  {
    projectId: { type: String, required: true },
    userId: { type: String, required: true },
    type: { type: String, required: true },
    payload: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<ActivityLog>("ActivityLog", activityLogSchema);
