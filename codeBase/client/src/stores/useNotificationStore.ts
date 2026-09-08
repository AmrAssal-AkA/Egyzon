import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { Notification } from "@/types/notification.types";
import {
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/services/notificationService";

interface NotificationState {
   socket: Socket | null;
    notifications: Notification[];
    isConnected: boolean;
    isLoading: boolean;

    unreadCount: () => number;

    connect: () => void;
    disconnect: () => void;
    markAsRead: (id: string) => Promise<void> | void;
    markAllAsRead: () => Promise<void> | void;
    setInitialNotifications: (list: Notification[]) => void;

    setLoading: (loading: boolean) => void;
}

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080";

export const useNotificationStore = create<NotificationState>((set, get) => ({
   socket: null,
    notifications: [],
    isConnected: false,
    isLoading: false,

    unreadCount: () => get().notifications.filter((n) => !n.isRead).length,

    connect: () => {
        if (get().socket) return;

        const socket = io(socketUrl, {
            withCredentials: true,
            transports: ["websocket"],
        });

        socket.on("connect", () => set({ isConnected: true }));

        socket.on("disconnect", () => set({ isConnected: false }));

        socket.on("connect_error", (err) => {
            console.error("Notification socket error:", err.message);
            set({ isConnected: false });
        });

        socket.on("notification:new", (notification: Notification) => {
            set((state) => ({ notifications: [notification, ...state.notifications] }));
        });

        set({ socket });
    },

    disconnect: () => {
        get().socket?.disconnect();
        set({ socket: null, isConnected: false });
    },

    markAsRead: async (id) => {
        set((state) => ({
            notifications: state.notifications.map((n) =>
                n.id === id || n._id === id ? { ...n, isRead: true } : n
            ),
        }));

        get().socket?.emit("notification:markAsRead", id);

        try {
            await markNotificationAsRead(id);
        } catch (error) {
            console.error("Failed to mark notification as read via API:", error);
        }
    },

    markAllAsRead: async () => {
        set((state) => ({
            notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        }));

        get().socket?.emit("notification:markAllAsRead");

        try {
            await markAllNotificationsAsRead();
        } catch (error) {
            console.error("Failed to mark all notifications as read via API:", error);
        }
    },

    setInitialNotifications: (list) => set({ notifications: list }),
    setLoading: (loading) => set({ isLoading: loading }),
}));

