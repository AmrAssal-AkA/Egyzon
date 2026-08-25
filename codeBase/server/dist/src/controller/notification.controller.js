"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearNotificationsForUser = exports.markAllNotificationsAsReadForUser = exports.markNotificationAsRead = exports.getNotificationForUser = void 0;
const notification_services_1 = require("../services/notification.services");
const Responses_1 = require("../utils/Responses");
const getNotificationForUser = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return (0, Responses_1.sendErrorResponse)(res, 401, "Unauthorized");
        const NotificationPerUser = await notification_services_1.NotificationServices.getNotificationsForUser(userId);
        return (0, Responses_1.sendSuccessResponse)(res, 200, "User Notification retrieved successfully", NotificationPerUser);
    }
    catch (errpr) {
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
    }
};
exports.getNotificationForUser = getNotificationForUser;
const markNotificationAsRead = async (req, res) => {
    try {
        const notificationId = req.params.id;
        if (!notificationId)
            return (0, Responses_1.sendErrorResponse)(res, 400, "Notification ID is required");
        const updatedNotification = await notification_services_1.NotificationServices.markNotificationAsRead(notificationId);
        return (0, Responses_1.sendSuccessResponse)(res, 200, "Notification marked as read successfully", updatedNotification);
    }
    catch (error) {
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
    }
};
exports.markNotificationAsRead = markNotificationAsRead;
const markAllNotificationsAsReadForUser = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return (0, Responses_1.sendErrorResponse)(res, 401, "Unauthorized");
        const result = await notification_services_1.NotificationServices.markAllNotificationsAsReadForUser(userId);
        return (0, Responses_1.sendSuccessResponse)(res, 200, "All notifications marked as read successfully", result);
    }
    catch (error) {
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
    }
};
exports.markAllNotificationsAsReadForUser = markAllNotificationsAsReadForUser;
const clearNotificationsForUser = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId)
            return (0, Responses_1.sendErrorResponse)(res, 401, "Unauthorized");
        const result = await notification_services_1.NotificationServices.clearNotificationsForUser(userId);
        return (0, Responses_1.sendSuccessResponse)(res, 200, "All notifications cleared successfully", result);
    }
    catch (error) {
        (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
    }
};
exports.clearNotificationsForUser = clearNotificationsForUser;
//# sourceMappingURL=notification.controller.js.map