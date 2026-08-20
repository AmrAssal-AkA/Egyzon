import Notification from "../models/notificationModel";
import { Notification as NotificationType } from "../types/notification.types";
import { AppError } from "../utils/AppError";

export const NotificationServices = {
    createNotification: async (notificationData: NotificationType) => {
        try {
            const notification = new Notification(notificationData);
            await notification.save();
            return notification;
        } catch (error) {
            if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
            throw new AppError(500, "Internal Server Error");
        }
    }
}