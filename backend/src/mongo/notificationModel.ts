// src/mongo/notificationModel.ts
import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  userId: string;       // Who will receive the notification
  type: string;         // e.g., TASK_CREATED, PROJECT_UPDATED
  title?: string;       // Short heading
  message?: string;     // Detailed message
  isRead: boolean;      // Has the user read it?
  createdAt: Date;
  readAt?: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },

    // Optional but useful for UI
    title: { type: String },
    message: { type: String },

    // Read status
    isRead: { type: Boolean, default: false },
    readAt: { type: Date }
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

export default mongoose.model<INotification>("Notification", NotificationSchema);
