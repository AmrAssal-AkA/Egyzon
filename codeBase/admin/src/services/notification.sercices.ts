import { AxiosError } from "axios";

import { serverClient } from "../lib/serverClient";
import type { ApiResponse } from "../types/auth";
import type {
  ApiNotification,
  NotificationItem,
  NotificationType,
} from "../types/notification";

declare const process: {
  env: Record<string, string | undefined>;
};

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? error.response?.data?.error ?? fallback;
  }

  return fallback;
}

function getNotificationsBaseUrl(): string {
  if (serverClient.defaults.baseURL) {
    return serverClient.defaults.baseURL.replace(/\/admin\/?$/, "");
  }

  return process.env.REACT_APP_API_BASE_URL_WS?? "http://localhost:8080/api";
}

function formatNotificationTitle(type: NotificationType, title?: string): string {
  if (title && title.trim().length > 0) {
    return title.trim();
  }

  switch (type) {
    case "success":
      return "Success";
    case "warning":
      return "Warning";
    case "error":
      return "Alert";
    case "info":
    default:
      return "Notification";
  }
}

export function mapApiNotificationToItem(
  apiNotification: ApiNotification
): NotificationItem {
  const parsedTimestamp = new Date(apiNotification.createdAt).getTime();
  const timestamp = Number.isNaN(parsedTimestamp) ? Date.now() : parsedTimestamp;

  return {
    id: apiNotification._id,
    user: apiNotification.user,
    type: apiNotification.type || "info",
    title: formatNotificationTitle(apiNotification.type, apiNotification.title),
    message: apiNotification.message,
    isRead: Boolean(apiNotification.isRead),
    createdAt: apiNotification.createdAt,
    timestamp,
  };
}

export async function getNotifications(): Promise<ApiResponse<NotificationItem[]>> {
  try {
    const { data } = await serverClient.get<ApiResponse<ApiNotification[]>>(
      "/notifications",
      { baseURL: getNotificationsBaseUrl() }
    );

    if (data.success && Array.isArray(data.data)) {
      return {
        ...data,
        data: data.data.map(mapApiNotificationToItem),
      };
    }

    return {
      success: data.success,
      message: data.message,
      data: [],
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to fetch notifications"),
      data: [],
    };
  }
}

export async function markNotificationAsRead(
  id: string
): Promise<ApiResponse<unknown>> {
  try {
    const { data } = await serverClient.patch<ApiResponse<unknown>>(
      `/notifications/${id}/markAsRead`,
      {},
      { baseURL: getNotificationsBaseUrl() }
    );

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to mark notification as read"),
    };
  }
}

export async function markAllNotificationsAsRead(): Promise<ApiResponse<unknown>> {
  try {
    const { data } = await serverClient.patch<ApiResponse<unknown>>(
      "/notifications/markAllAsRead",
      {},
      { baseURL: getNotificationsBaseUrl() }
    );

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to mark all notifications as read"),
    };
  }
}

export async function clearNotifications(): Promise<ApiResponse<unknown>> {
  try {
    const { data } = await serverClient.delete<ApiResponse<unknown>>(
      "/notifications/clear",
      { baseURL: getNotificationsBaseUrl() }
    );

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to clear notifications"),
    };
  }
}