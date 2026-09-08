import axios from "axios";

import { apiClient } from "@/lib/apiClient";
import type {
  GetNotificationsResponse,
  MarkAsReadResponse,
  MarkAllAsReadResponse,
} from "@/types/notification.types";

export const getNotifications = async (): Promise<GetNotificationsResponse> => {
  try {
    const response = await apiClient.get<GetNotificationsResponse>(
      "/api/notifications/getNotifications"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Failed to fetch notifications"
      );
    }
    throw new Error("Failed to fetch notifications");
  }
};

export const markNotificationAsRead = async (
  id: string
): Promise<MarkAsReadResponse> => {
  try {
    const response = await apiClient.patch<MarkAsReadResponse>(
      "/api/notifications/markAsRead",
      { id }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Failed to mark notification as read"
      );
    }
    throw new Error("Failed to mark notification as read");
  }
};

export const markAllNotificationsAsRead = async (): Promise<MarkAllAsReadResponse> => {
  try {
    const response = await apiClient.patch<MarkAllAsReadResponse>(
      "/api/notifications/markAllAsRead"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.message || "Failed to mark all notifications as read"
      );
    }
    throw new Error("Failed to mark all notifications as read");
  }
};


