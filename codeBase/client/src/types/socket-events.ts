import { Product } from "./product.type";

export interface ServerToClientEvents {
  "new-product": (product: Product) => void;
  "msg-receive": (msg: string) => void;
  "order:status_updated": (payload: { orderId: string; status: string; message: string }) => void;
  "seller:approved": (payload: { message: string }) => void;
  "seller:rejected": (payload: { message: string; reason?: string }) => void;
  "seller:kyc_submitted": (payload: { sellerId: string; message: string }) => void;
  "inventory:low_stock": (payload: { productId: string; quantity: number; message: string }) => void;
  "notification": (notification: NotificationPayload) => void;
  "product:added": (payload: { productId: string; message: string }) => void;
}

export interface ClientToServerEvents {
  "send-msg": (data: { to: string; msg: string }) => void;
}

export interface NotificationPayload {
  id: string;
  user: string;
  type: string;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
}