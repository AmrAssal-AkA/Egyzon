"use client";

import { useEffect } from "react";

import { toast } from "sonner";

import { useSocket } from "@/hooks/useSocket";
import { useNotificationStore } from "@/stores/seller/useNotificationStore";
import type { Notification } from "@/types/notification.types";
import type { NotificationPayload } from "@/types/socket-events";

export default function NotificationListener() {
  useSocket();
  const socket = useNotificationStore((state) => state.socket);

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (notification: Notification | NotificationPayload) => {
      toast.info(notification.title || "New Notification", {
        description: notification.message,
      });
    };

    const handleAddProduct = (payload: { productId: string; message: string }) => {
      toast.success("New Product Added", {
        description: payload.message,
      });
    };

    const handleOrderStatus = (payload: { orderId: string; status: string; message: string }) => {
      toast.info(`Order Status: ${payload.status}`, {
        description: payload.message,
      });
    };

    const handleSellerApproved = (payload: { message: string }) => {
      toast.success("Account Approved", {
        description: payload.message,
      });
    };

    const handleSellerRejected = (payload: { message: string; reason?: string }) => {
      toast.error("Account Application Update", {
        description: payload.reason ? `${payload.message}: ${payload.reason}` : payload.message,
      });
    };

    const handleLowStock = (payload: { productId: string; quantity: number; message: string }) => {
      toast.warning("Low Stock Alert", {
        description: payload.message,
      });
    };

    const handleKycSubmitted = (payload: { sellerId: string; message: string }) => {
      toast.info("KYC Submitted", {
        description: payload.message,
      });
    };

    socket.on("notification:new", handleNotification);
    socket.on("notification", handleNotification);
    socket.on("product:added", handleAddProduct);
    socket.on("order:status_updated", handleOrderStatus);
    socket.on("seller:approved", handleSellerApproved);
    socket.on("seller:rejected", handleSellerRejected);
    socket.on("seller:kyc_submitted", handleKycSubmitted);
    socket.on("inventory:low_stock", handleLowStock);

    return () => {
      socket.off("notification:new", handleNotification);
      socket.off("notification", handleNotification);
      socket.off("product:added", handleAddProduct);
      socket.off("order:status_updated", handleOrderStatus);
      socket.off("seller:approved", handleSellerApproved);
      socket.off("seller:rejected", handleSellerRejected);
      socket.off("seller:kyc_submitted", handleKycSubmitted);
      socket.off("inventory:low_stock", handleLowStock);
    };
  }, [socket]);

  return null;
}