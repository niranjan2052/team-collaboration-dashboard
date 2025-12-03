// src/services/notificationService.ts
import Notification from "../mongo/notificationModel.js";

export const getNotifications = async (userId: string) => {
  return Notification.find({ userId }).sort({ createdAt: -1 });
};

export const markAsRead = async (notificationId: string) => {
  return Notification.findByIdAndUpdate(
    notificationId,
    { isRead: true, readAt: new Date() },
    { new: true }
  );
};
