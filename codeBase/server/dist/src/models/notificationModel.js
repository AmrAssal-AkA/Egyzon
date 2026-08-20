"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    user: { type: String, required: true },
    type: { type: String, enum: ["info", "success", "warning", "error"], required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
const NotificationModel = (0, mongoose_1.model)("Notification", notificationSchema);
exports.default = NotificationModel;
//# sourceMappingURL=notificationModel.js.map