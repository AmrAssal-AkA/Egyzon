import { create } from "zustand";
import type { NotificationPayload } from "../../types/socket-events";

interface NotificationState {
  notifications: NotificationPayload[];
  unreadCount: number;
  addNotification: (notification: NotificationPayload) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  setInitial: (list: NotificationPayload[], unreadCount: number) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) =>
    set((state) => {
      // Check if notification with same id already exists
      const exists = state.notifications.some((n) => n.id === notification.id);
      if (exists) return state;

      const isUnread = !notification.isRead;
      return {
        notifications: [notification, ...state.notifications],
        unreadCount: isUnread ? state.unreadCount + 1 : state.unreadCount,
      };
    }),
  setInitial: (list: NotificationPayload[], unreadCount: number) =>
    set(() => ({
      notifications: list,
      unreadCount: unreadCount,
    })),
  markAsRead: (notificationId: string) =>
    set((state) => {
      let targetWasUnread = false;
      const updated = state.notifications.map((item) => {
        if (item.id === notificationId) {
          if (!item.isRead) targetWasUnread = true;
          return { ...item, isRead: true };
        }
        return item;
      });
      return {
        notifications: updated,
        unreadCount: targetWasUnread
          ? Math.max(0, state.unreadCount - 1)
          : state.unreadCount,
      };
    }),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((item) => ({ ...item, isRead: true })),
      unreadCount: 0,
    })),
  clearNotifications: () =>
    set(() => ({
      notifications: [],
      unreadCount: 0,
    })),
}));