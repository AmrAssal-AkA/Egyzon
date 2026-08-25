"use client";

import { useEffect } from "react";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { getNotifications } from "@/services/notificationService";
import { useAuth } from "./useAuth";

export function useSocket() {
  const connect = useNotificationStore((state) => state.connect);
  const disconnect = useNotificationStore((state) => state.disconnect);
  const initialNotifications = useNotificationStore((state) => state.setInitialNotifications);
  const setLoading = useNotificationStore((state) => state.setLoading);
  const { user } = useAuth();
  
  const notifications = useNotificationStore((state) => state.notifications);
  const isConnected = useNotificationStore((state) => state.isConnected);
  const isLoading = useNotificationStore((state) => state.isLoading);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);
  
  useEffect(() => {
    let cancelled = false;
    if (!user) return;
    async function fetchInitialNotifications() {
      setLoading(true);
      try {
        const response = await getNotifications();
        if (!cancelled && response?.data) {
          initialNotifications(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch initial notifications:", error);
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
    };
  }, [connect, disconnect, initialNotifications, setLoading, user]);

  return {notifications, isConnected, isLoading, markAsRead, markAllAsRead};
}