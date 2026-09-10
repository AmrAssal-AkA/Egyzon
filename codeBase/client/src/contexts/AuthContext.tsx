"use client";

import React, { createContext, useState, useEffect, useCallback, ReactNode } from "react";
import { User, LoginPayload, RegisterPayload, ApiResponse } from "@/types/auth";
import { authServices, ApiCall } from "@/services/authServices";
import { useCartStore } from "@/stores/buyer/useCart";
import { useWishlistStore } from "@/stores/buyer/wishlist";

import { isSeller as checkIsSeller } from "@/lib/auth/roles";

interface AuthContextType {
  user: User | null;
  token: string | null;
  Access_token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  role: string | null;
  isSeller: boolean;
  login: (payload: LoginPayload) => Promise<ApiResponse<User>>;
  register: (payload: RegisterPayload) => Promise<ApiResponse<User>>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
  verifyEmail: (token: string) => Promise<ApiResponse<unknown>>;
  continueWithGoogle: () => void;
}

const readAccessTokenFromCookies = (): string | null => {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("Access_token=") || cookie.startsWith("token="));

  if (!match) return null;

  return decodeURIComponent(match.split("=").slice(1).join("="));
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isAuthenticated = !!user;
  const role = user?.role || null;
  const isSeller = checkIsSeller(role);

  const syncUserBuyerStores = (userRole?: string | null) => {
    if (checkIsSeller(userRole)) {
      useCartStore.getState().clearLocalCart();
      useWishlistStore.getState().clearWishlist();
    } else {
      useCartStore.getState().fetchCartFromServer();
      useWishlistStore.getState().fetchWishlistFromServer();
    }
  };

  const refreshSession = useCallback(async (): Promise<boolean> => {
    try {
      const meRes = await authServices.me();
      if (meRes.success && meRes.data) {
        const cookieToken = readAccessTokenFromCookies();
        const nextToken = cookieToken ?? token ?? null;
        setToken(nextToken);
        setUser({ ...meRes.data, token: nextToken, Access_token: nextToken });
        syncUserBuyerStores(meRes.data.role);
        return true;
      }

      type RefreshResponse = { success: boolean; data?: unknown; message?: string };
      const res = await ApiCall.post<RefreshResponse>("/auth/refresh");
      if (res.data?.success) {
        const meRes2 = await authServices.me();
        if (meRes2.success && meRes2.data) {
          const cookieToken = readAccessTokenFromCookies();
          const nextToken = cookieToken ?? token ?? null;
          setToken(nextToken);
          setUser({ ...meRes2.data, token: nextToken, Access_token: nextToken });
          syncUserBuyerStores(meRes2.data.role);
          return true;
        }
      }
      setUser(null);
      setToken(null);
      useCartStore.getState().clearLocalCart();
      useWishlistStore.getState().clearWishlist();
      return false;
    } catch (error) {
      setUser(null);
      setToken(null);
      useCartStore.getState().clearLocalCart();
      useWishlistStore.getState().clearWishlist();
      return false;
    }
  }, [token]);

  const loadSession = useCallback(async () => {
    setLoading(true);
    const cookieToken = readAccessTokenFromCookies();
    if (cookieToken) {
      setToken(cookieToken);
    }

    const res = await authServices.me();
    if (res.success && res.data) {
      const nextToken = cookieToken ?? token ?? null;
      setUser({ ...res.data, token: nextToken, Access_token: nextToken });
      syncUserBuyerStores(res.data.role);
    } else {
      await refreshSession();
    }
    setLoading(false);
  }, [refreshSession, token]);
  useEffect(() => {
    void loadSession();

    const interceptorId = ApiCall.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== "/auth/login" && originalRequest.url !== "/auth/refresh" && originalRequest.url !== "/auth/me" && !originalRequest.url?.startsWith("/auth/verifyEmail")) {
          originalRequest._retry = true;
          const refreshed = await refreshSession();
          if (refreshed) {
            return ApiCall(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      ApiCall.interceptors.response.eject(interceptorId);
    };
  }, [loadSession, refreshSession]);

  const login = async (payload: LoginPayload) => {
    const res = await authServices.login(payload);
    if (res.success && res.data) {
      const loginData = res.data as User & { token?: string; Access_token?: string };
      const nextToken = loginData.Access_token ?? loginData.token ?? readAccessTokenFromCookies();
      setToken(nextToken ?? null);
      setUser({ ...loginData, token: nextToken ?? null, Access_token: nextToken ?? null });
      syncUserBuyerStores(loginData.role);
    }
    return res;
  };

  const register = async (payload: RegisterPayload) => {
    const res = await authServices.register(payload);
    if (res.success && res.data) {
      const registerData = res.data as User & { token?: string; Access_token?: string };
      const nextToken = registerData.Access_token ?? registerData.token ?? readAccessTokenFromCookies();
      setToken(nextToken ?? null);
      setUser({ ...registerData, token: nextToken ?? null, Access_token: nextToken ?? null });
      syncUserBuyerStores(registerData.role);
    }
    return res;
  };

  const logout = async () => {
    await authServices.logout();
    setUser(null);
    setToken(null);
    useCartStore.getState().clearLocalCart();
    useWishlistStore.getState().clearWishlist();
  };

  const verifyEmail = async (token: string) => {
    const res = await authServices.verifyEmail(token);
    if (res.success) {
      await refreshSession();
    }
    return res;
  };

  const continueWithGoogle = () => {
    authServices.continueWithGoogle();
  };

  return (
    <AuthContext.Provider value={{ user, token, Access_token: token, loading, isAuthenticated, role, isSeller, login, register, logout, refreshSession, verifyEmail, continueWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
