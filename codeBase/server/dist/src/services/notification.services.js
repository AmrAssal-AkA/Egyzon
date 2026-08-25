"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationServices = void 0;
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const socket_1 = require("../config/socket");
const AppError_1 = require("../utils/AppError");
exports.NotificationServices = {
    createNotification: async (notificationData) => {
        try {
            const notification = new notificationModel_1.default(notificationData);
            await notification.save();
            (0, socket_1.emitNotificationToUser)(notificationData.user, notification.toObject());
            return notification;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    getNotificationsForUser: async (userId) => {
        try {
            const notifications = await notificationModel_1.default.find({ user: userId }).sort({ createdAt: -1 });
            return notifications;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    markNotificationAsRead: async (notificationId) => {
        try {
            const notification = await notificationModel_1.default.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
            if (!notification)
                throw new AppError_1.AppError(404, "Notification not found");
            return notification;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    markAllNotificationsAsReadForUser: async (userId) => {
        try {
            const result = await notificationModel_1.default.updateMany({ user: userId, isRead: false }, { isRead: true });
            return result;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
    clearNotificationsForUser: async (userId) => {
        try {
            const result = await notificationModel_1.default.deleteMany({ user: userId });
            return result;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
};
//# sourceMappingURL=notification.services.js.map