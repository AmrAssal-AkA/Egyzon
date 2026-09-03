export type NotificationType = "info" | "success" | "warning" | "error";

export interface ApiNotification {
  _id: string;
  user: string;
  type: NotificationType;
  message: string;
  title?: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  user?: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  timestamp: number;
}

export type NotificationPayload = NotificationItem;
