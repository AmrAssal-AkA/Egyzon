"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User, LoginPayload, RegisterPayload, ApiResponse } from "@/types/auth";
import { authServices, ApiCall } from "@/services/authServices";
import { useCartStore } from "@/stores/buyer/useCart";
import { useWishlistStore } from "@/stores/buyer/wishlist";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  role: string | null;
  login: (payload: LoginPayload) => Promise<ApiResponse<User>>;
  register: (payload: RegisterPayload) => Promise<ApiResponse<User>>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
  verifyEmail: (token: string) => Promise<ApiResponse<unknown>>;
  continueWithGoogle: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isAuthenticated = !!user;
  const role = user?.role || null;

  const refreshSession = async (): Promise<boolean> => {
    try {
      const meRes = await authServices.me();
      if (meRes.success && meRes.data) {
        setUser(meRes.data);
        useCartStore.getState().fetchCartFromServer();
        useWishlistStore.getState().fetchWishlistFromServer();
        return true;
      }
      const res = await ApiCall.post<{ success: boolean; data?: any; message?: string }>("/auth/refresh");
      if (res.data?.success) {
        const meRes2 = await authServices.me();
        if (meRes2.success && meRes2.data) {
          setUser(meRes2.data);
          useCartStore.getState().fetchCartFromServer();
          useWishlistStore.getState().fetchWishlistFromServer();
          return true;
        }
      }
      setUser(null);
      useCartStore.getState().clearLocalCart();
      useWishlistStore.getState().clearWishlist();
      return false;
    } catch (error) {
      setUser(null);
      useCartStore.getState().clearLocalCart();
      useWishlistStore.getState().clearWishlist();
      return false;
    }
  };

  const loadSession = async () => {
    setLoading(true);
    const res = await authServices.me();
    if (res.success && res.data) {
      setUser(res.data);
      useCartStore.getState().fetchCartFromServer();
      useWishlistStore.getState().fetchWishlistFromServer();
    } else {
      await refreshSession();
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSession();
    
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
  }, []);

  const login = async (payload: LoginPayload) => {
    const res = await authServices.login(payload);
    if (res.success && res.data) {
      setUser(res.data);
      useCartStore.getState().fetchCartFromServer();
      useWishlistStore.getState().fetchWishlistFromServer();
    }
    return res;
  };

  const register = async (payload: RegisterPayload) => {
    const res = await authServices.register(payload);
    if (res.success && res.data) {
      setUser(res.data);
      useCartStore.getState().fetchCartFromServer();
      useWishlistStore.getState().fetchWishlistFromServer();
    }
    return res;
  };

  const logout = async () => {
    await authServices.logout();
    setUser(null);
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
    <AuthContext.Provider value={{ user, loading, isAuthenticated, role, login, register, logout, refreshSession, verifyEmail, continueWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
