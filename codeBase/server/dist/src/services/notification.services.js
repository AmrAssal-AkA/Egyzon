"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationServices = void 0;
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const AppError_1 = require("../utils/AppError");
exports.NotificationServices = {
    createNotification: async (notificationData) => {
        try {
            const notification = new notificationModel_1.default(notificationData);
            await notification.save();
            return notification;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError)
                throw new AppError_1.AppError(error.statusCode, error.message);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    }
};
//# sourceMappingURL=notification.services.js.map