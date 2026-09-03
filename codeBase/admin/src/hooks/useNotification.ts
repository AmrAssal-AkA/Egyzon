import { useCallback, useEffect } from "react";

import useSWR from "swr";

import { useSocket } from "../context/socketContext";
import {
  clearNotifications as clearNotificationsService,
  getNotifications,
  mapApiNotificationToItem,
  markAllNotificationsAsRead as markAllNotificationsAsReadService,
  markNotificationAsRead as markNotificationAsReadService,
} from "../services/notification.sercices";
import type {
  ApiNotification,
  NotificationItem,
  NotificationPayload,
} from "../types/notification";

export type { NotificationPayload, NotificationItem };

const NOTIFICATIONS_SWR_KEY = "notifications";

function normalizeNotification(
  payload: Partial<ApiNotification> & Partial<NotificationItem>
): NotificationItem {
  if (payload.createdAt && !payload.timestamp) {
    return mapApiNotificationToItem({
      _id: payload.id ?? payload._id ?? String(Date.now()),
      user: payload.user ?? "",
      type: payload.type ?? "info",
      message: payload.message ?? "",
      title: payload.title,
      isRead: Boolean(payload.isRead),
      createdAt: payload.createdAt,
    });
  }

  const id = payload.id ?? payload._id ?? String(Date.now());
  const type = payload.type ?? "info";
  const title =
    payload.title ?? (type.charAt(0).toUpperCase() + type.slice(1));
  const message = payload.message ?? "";
  const isRead = Boolean(payload.isRead);
  const createdAt = payload.createdAt ?? new Date().toISOString();
  const timestamp = payload.timestamp ?? Date.now();

  return {
    id,
    user: payload.user,
    type,
    title,
    message,
    isRead,
    createdAt,
    timestamp,
  };
}

export const useNotification = () => {
  const socket = useSocket();

  const { data, error, isLoading, mutate } = useSWR<NotificationItem[]>(
    NOTIFICATIONS_SWR_KEY,
    async () => {
      const response = await getNotifications();
      if (!response.success) {
        throw new Error(response.message);
      }
      return response.data ?? [];
    },
    {
      revalidateOnFocus: true,
    }
  );

  const notifications = data ?? [];

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (
      incoming: Partial<ApiNotification> & Partial<NotificationItem>
    ) => {
      const normalized = normalizeNotification(incoming);

      mutate((current = []) => {
        const exists = current.some((item) => item.id === normalized.id);
        if (exists) {
          return current.map((item) =>
            item.id === normalized.id ? { ...item, ...normalized } : item
          );
        }
        return [normalized, ...current];
      }, false);

      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        try {
          new Notification(normalized.title, {
            body: normalized.message,
            icon: "/favicon.ico",
          });
        } catch {
          // ignore notification trigger errors
        }
      }
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket, mutate]);

  const clearNotifications = useCallback(async () => {
    await clearNotificationsService();
    await mutate([], false);
  }, [mutate]);

  const markAsRead = useCallback(
    async (id: string) => {
      await mutate(
        (current = []) =>
          current.map((item) =>
            item.id === id ? { ...item, isRead: true } : item
          ),
        false
      );
      await markNotificationAsReadService(id);
    },
    [mutate]
  );

  const markAllAsRead = useCallback(async () => {
    await mutate(
      (current = []) => current.map((item) => ({ ...item, isRead: true })),
      false
    );
    await markAllNotificationsAsReadService();
  }, [mutate]);

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  return {
    notifications,
    unreadCount,
    isLoading,
    error: error instanceof Error ? error.message : null,
    refresh: mutate,
    clearNotifications,
    markAsRead,
    markAllAsRead,
  };
};
