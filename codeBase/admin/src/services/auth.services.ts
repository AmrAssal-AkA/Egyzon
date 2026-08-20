import { AxiosError } from "axios";

import { authClient } from "../lib/authClient";
import { serverClient } from "../lib/serverClient";
import type {
  Admin,
  ApiResponse,
  LoginPayload,
  LoginResponseData,
} from "../types/auth";

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? error.response?.data?.error ?? fallback;
  }

  return fallback;
}

function sanitizeAdmin(admin: Admin): Admin {
  return {
    _id: admin._id,
    email: admin.email,
    FirstName: admin.FirstName,
    LastName: admin.LastName,
    role: admin.role,
    employeeId: admin.employeeId,
  };
}

export function loginAdmin(
  email: string,
  password: string
): Promise<ApiResponse<LoginResponseData>> {
  return login({ email, password });
}

export async function login(
  payload: LoginPayload
): Promise<ApiResponse<LoginResponseData>> {
  try {
    const { data } = await serverClient.post<ApiResponse<LoginResponseData>>(
      "/login",
      payload
    );

    if (data.success && data.data?.user) {
      return {
        ...data,
        data: {
          user: sanitizeAdmin(data.data.user),
        },
      };
    }

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Login failed"),
    };
  }
}

export async function getCurrentAdmin(): Promise<ApiResponse<Admin>> {
  try {
    const { data } = await authClient.get<ApiResponse<Admin>>("/me");

    if (data.success && data.data) {
      return {
        ...data,
        data: sanitizeAdmin(data.data),
      };
    }

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to fetch admin session"),
    };
  }
}

export async function refreshSession(): Promise<ApiResponse<unknown>> {
  try {
    const { data } = await authClient.post<ApiResponse<unknown>>("/refresh");
    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to refresh session"),
    };
  }
}

export async function logoutAdmin(): Promise<ApiResponse<unknown>> {
  try {
    const { data } = await authClient.post<ApiResponse<unknown>>("/logout");
    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Logout failed"),
    };
  }
}
