
export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "order"
  | "inventory"
  | "low_stock"
  | "seller_approved"
  | "seller_rejected"
  | "product"
  | (string & {});

export interface Notification {
  id: string;
  _id?: string;
  user?: string;
  type: NotificationType;
  title?: string;
  message: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
}

export interface GetNotificationsResponse {
  success: boolean;
  message: string;
  data: Notification[];
}

export interface MarkAsReadResponse {
  success: boolean;
  message: string;
  data?: Notification;
}