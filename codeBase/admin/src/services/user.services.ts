import { AxiosError } from "axios";

import { serverClient } from "../lib/serverClient";
import type { ApiResponse } from "../types/auth";
import type { ApiUser, User, UserRole } from "../types/user";

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? error.response?.data?.error ?? fallback;
  }

  return fallback;
}

function toUserRole(role: string): UserRole {
  if (role === "seller" || role === "customer" || role === "admin") {
    return role;
  }

  return "customer";
}

export function mapApiUserToUser(apiUser: ApiUser): User {
  const name = `${apiUser.FirstName} ${apiUser.LastName}`.trim();

  return {
    id: apiUser._id,
    name: name || apiUser.email,
    email: apiUser.email,
    role: toUserRole(apiUser.role),
    status: apiUser.isBlocked ? "suspended" : "active",
    joinedDate: apiUser.joinedDate,
    lastActivity: apiUser.lastActiveDate,
  };
}

export async function activateUser(userId: string): Promise<ApiResponse<string>> {
  try {
    const { data } = await serverClient.patch<ApiResponse<string>>(
      `/acivateUser/${userId}`
    );

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to activate user"),
    };
  }
}

export async function blockUser(userId: string): Promise<ApiResponse<string>> {
  try {
    const { data } = await serverClient.patch<ApiResponse<string>>(
      `/BlockTheUser/${userId}`
    );

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to block user"),
    };
  }
}

export async function getUsers(): Promise<ApiResponse<User[]>> {
  try {
    const { data } = await serverClient.get<ApiResponse<ApiUser[]>>("/user");

    if (data.success && data.data) {
      return {
        ...data,
        data: data.data.map(mapApiUserToUser),
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
      message: getErrorMessage(error, "Failed to fetch users"),
    };
  }
}
