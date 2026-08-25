import axios, { AxiosError, AxiosInstance } from "axios";
import { getBaseUrl } from "@/lib/apiClient";
import { RegisterPayload, LoginPayload, User, ApiResponse, OnboardingPayload, ForgetPasswordPayload, ResetPasswordPayload } from "../types/auth";

export const ApiCall: AxiosInstance = axios.create({
    baseURL: typeof window !== "undefined" ? "/api" : `${getBaseUrl()}/api`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

ApiCall.interceptors.request.use((config) => {
    if (typeof window === "undefined" && (!config.baseURL || config.baseURL.startsWith("/"))) {
        config.baseURL = `${getBaseUrl()}/api`;
    }
    return config;
});

const getErrorMessage = (error: unknown, fallback: string): string => {
    if (error instanceof AxiosError) {
        return error.response?.data?.message ?? fallback;
    }
    return fallback;
};

export const authServices = {
    register: async (payload: RegisterPayload): Promise<ApiResponse<User>> => {
        try { 
            const { data } = await ApiCall.post<ApiResponse<User>>("/auth/register", payload);
            return data;
        } catch (error: unknown) {
            console.error("Registration error:", error);
            return { success: false, message: getErrorMessage(error, "Registration failed") };
        }
    },
    login: async (payload: LoginPayload): Promise<ApiResponse<User>> => {
        try {
            const { data } = await ApiCall.post<ApiResponse<User>>("/auth/login", payload);
            return data;
        } catch (error: unknown) {
            return { success: false, message: getErrorMessage(error, "Login failed") };
        }
    },
    logout: async (): Promise<ApiResponse<unknown>> => {
        try {
            const { data } = await ApiCall.post<ApiResponse<unknown>>("/auth/logout");
            return data;
        } catch (error: unknown) {
            return { success: false, message: getErrorMessage(error, "Logout failed") };
        }
    },
    me: async (): Promise<ApiResponse<User>> => {
        try {
            const { data } = await ApiCall.get<ApiResponse<User>>("/auth/me");
            return data;
        } catch (error: unknown) {
            return { success: false, message: getErrorMessage(error, "Failed to fetch user") };
        }
    },
    verifyEmail: async (token: string): Promise<ApiResponse<unknown>> => {
        try {
            const { data } = await ApiCall.get<ApiResponse<unknown>>(`/auth/verifyEmail`, {
                params: { token },
            });
            return data;
        } catch (error: unknown) {
            return { success: false, message: getErrorMessage(error, "Token verification failed") };
        }
    },
    completeOnboarding: async (payload: OnboardingPayload): Promise<ApiResponse<unknown>> => {
        try {
            const { data } = await ApiCall.patch<ApiResponse<unknown>>("/auth/onBoarding", payload);
            console.log("Onboarding Data: ", data)
            return data;
        } catch (error: unknown) {
            return { success: false, message: getErrorMessage(error, "Onboarding failed") };
        }
    },
    forgetPassword: async (payload: ForgetPasswordPayload): Promise<ApiResponse<unknown>> => {
        try {
            const { data } = await ApiCall.post<ApiResponse<unknown>>("/auth/forgetPassword", payload);
            return data;
        } catch (error: unknown) {
            return { success: false, message: getErrorMessage(error, "Failed to send reset email") };
        }
    },
    resetPassword: async (payload: ResetPasswordPayload, token: string): Promise<ApiResponse<unknown>> => {
        try {
            const { data } = await ApiCall.patch<ApiResponse<unknown>>("/auth/forgetPassword/resetPassword", payload, {
                params: { token },
            });
            return data;
        } catch (error: unknown) {
            return { success: false, message: getErrorMessage(error, "Password reset failed") };
        }
    },
    continueWithGoogle: (): void => {
        window.location.href = "/api/auth/continueWithGoogle";
    },
};