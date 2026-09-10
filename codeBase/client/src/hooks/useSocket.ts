"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { getNotifications } from "@/services/notificationService";
import { useAuth } from "./useAuth";

export function useSocket() {
  const socket = useNotificationStore((state) => state.socket);
  const connect = useNotificationStore((state) => state.connect);
  const disconnect = useNotificationStore((state) => state.disconnect);
  const initialNotifications = useNotificationStore((state) => state.setInitialNotifications);
  const setLoading = useNotificationStore((state) => state.setLoading);
  const { user, token } = useAuth();
  
  const notifications = useNotificationStore((state) => state.notifications);
  const isConnected = useNotificationStore((state) => state.isConnected);
  const isLoading = useNotificationStore((state) => state.isLoading);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);
  
  useEffect(() => {
    let cancelled = false;
    if (!user || !token) return;
    async function fetchInitialNotifications() {
      setLoading(true);
      try {
        const response = await getNotifications();
        if (!cancelled && response?.data) {
          initialNotifications(response.data);
        }
      } catch (error) {
        console.error("Error fetching initial notifications:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    fetchInitialNotifications();
    connect();
    return () => {
      cancelled = true;
      disconnect();
      console.log("Socket disconnected and cleanup done.");
    };
  }, [connect, disconnect, initialNotifications, setLoading, user]);

  useEffect(() => {
    if (isConnected && socket && user?.role === "seller") {
      socket.emit("sales-indicator:subscribe");
    }
  }, [isConnected, socket, user?.role]);

  return { socket, notifications, isConnected, isLoading, markAsRead, markAllAsRead };
}