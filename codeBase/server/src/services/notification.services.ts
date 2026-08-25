import Notification from "../models/notificationModel";
import {createNotificationInput } from "../types/notification.types";
import {emitNotificationToUser} from "../config/socket";
import { AppError } from "../utils/AppError";

export const NotificationServices = {
    createNotification: async (notificationData: createNotificationInput) => {
        try {
            const notification = new Notification(notificationData);
            await notification.save();
            emitNotificationToUser(notificationData.user, notification.toObject());
            
            return notification;
        } catch (error) {
            if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
            throw new AppError(500, "Internal Server Error");
        }
    },
    getNotificationsForUser: async (userId: string) => {
        try {
            const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
            return notifications;
        } catch (error) {
            if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
            throw new AppError(500, "Internal Server Error");
        }
    },
    markNotificationAsRead: async (notificationId: string) => {
        try {
            const notification = await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
            if (!notification) throw new AppError(404, "Notification not found");
            return notification;
        } catch (error) {
            if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
            throw new AppError(500, "Internal Server Error");
        }
    },
    markAllNotificationsAsReadForUser: async (userId: string) => {
        try {
            const result = await Notification.updateMany({ user: userId, isRead: false }, { isRead: true });
            return result;
        } catch (error) {
            if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
            throw new AppError(500, "Internal Server Error");
        }
    },
    clearNotificationsForUser: async (userId: string) => {
        try {
            const result = await Notification.deleteMany({ user: userId });
            return result;
        } catch (error) {
            if (error instanceof AppError) throw new AppError(error.statusCode, error.message);
            throw new AppError(500, "Internal Server Error");
        }
    },
}