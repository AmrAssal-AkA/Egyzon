import { Schema, model } from "mongoose";

import { Notification } from "../types/notification.types";

const notificationSchema = new Schema<Notification>({
  user: { type: String, required: true },
  type: {
    type: String,
    enum: [
      "info",
      "success",
      "warning",
      "error",
      "partner_Applicant",
      "new_order",
    ],
    required: true,
  },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const NotificationModel = model<Notification>(
  "Notification",
  notificationSchema,
);

export default NotificationModel;
