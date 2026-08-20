"use client";

import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useNotificationStore } from "@/stores/seller/useNotificationStore";
import type { NotificationPayload } from "@/types/socket-events";
import { toast } from "sonner";

export default function NotificationListener() {
  const { socket } = useSocket();
  const addNotification = useNotificationStore((state) => state.addNotification);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (notification: NotificationPayload) => {
      addNotification(notification);
      toast.success(notification.title || "New Notification", {
        description: notification.message,
      });
    };

    const handleAddProduct = (payload: { productId: string; message: string }) => {
      const notification: NotificationPayload = {
        id: `product-${payload.productId}-${Date.now()}`,
        user: "",
        type: "product",
        title: "New Product Added",
        message: payload.message,
        isRead: false,
        createdAt: new Date().toISOString(),
      }
      handleNotification(notification);
    }

    const handleOrderStatus = (payload: { orderId: string; status: string; message: string }) => {
      const notification: NotificationPayload = {
        id: `order-${payload.orderId}-${Date.now()}`,
        user: "",
        type: "order",
        title: `Order Status: ${payload.status}`,
        message: payload.message,
        data: { orderId: payload.orderId },
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      handleNotification(notification);
    };

    const handleSellerApproved = (payload: { message: string }) => {
      const notification: NotificationPayload = {
        id: `seller-approved-${Date.now()}`,
        user: "",
        type: "seller_approved",
        title: "Account Approved",
        message: payload.message,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      handleNotification(notification);
    };

    const handleSellerRejected = (payload: { message: string; reason?: string }) => {
      const notification: NotificationPayload = {
        id: `seller-rejected-${Date.now()}`,
        user: "",
        type: "seller_rejected",
        title: "Account Application Update",
        message: payload.reason ? `${payload.message}: ${payload.reason}` : payload.message,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      handleNotification(notification);
    };

    const handleLowStock = (payload: { productId: string; quantity: number; message: string }) => {
      const notification: NotificationPayload = {
        id: `low-stock-${payload.productId}-${Date.now()}`,
        user: "",
        type: "inventory",
        title: "Low Stock Alert",
        message: payload.message,
        data: { productId: payload.productId, quantity: payload.quantity },
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      handleNotification(notification);
    };

    socket.on("notification", handleNotification);
    socket.on("product:added", handleAddProduct);
    socket.on("order:status_updated", handleOrderStatus);
    socket.on("seller:approved", handleSellerApproved);
    socket.on("seller:rejected", handleSellerRejected);
    socket.on("inventory:low_stock", handleLowStock);

    return () => {
      socket.off("notification", handleNotification);
      socket.off("product:added", handleAddProduct);
      socket.off("order:status_updated", handleOrderStatus);
      socket.off("seller:approved", handleSellerApproved);
      socket.off("seller:rejected", handleSellerRejected);
      socket.off("inventory:low_stock", handleLowStock);
    };
  }, [socket, addNotification]);

  return null;
}