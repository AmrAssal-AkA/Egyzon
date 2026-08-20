import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { authClient } from "../lib/authClient";
import { serverClient } from "../lib/serverClient";
import {
  getCurrentAdmin,
  login as loginAdmin,
  logoutAdmin,
  refreshSession as refreshAdminSession,
} from "../services/auth.services";
import type { AuthContextValue, LoginPayload } from "../types/auth";

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
  const [admin, setAdmin] = useState<AuthContextValue["admin"]>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!admin;

  const refreshSession = useCallback(async (): Promise<boolean> => {
    try {
      const meResponse = await getCurrentAdmin();
      if (meResponse.success && meResponse.data) {
        setAdmin(meResponse.data);
        return true;
      }

      const refreshResponse = await refreshAdminSession();
      if (!refreshResponse.success) {
        setAdmin(null);
        return false;
      }

      const refreshedMeResponse = await getCurrentAdmin();
      if (refreshedMeResponse.success && refreshedMeResponse.data) {
        setAdmin(refreshedMeResponse.data);
        return true;
      }

      setAdmin(null);
      return false;
    } catch {
      setAdmin(null);
      return false;
    }
  }, []);

  const loadSession = useCallback(async () => {
    setLoading(true);
    await refreshSession();
    setLoading(false);
  }, [refreshSession]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  useEffect(() => {
    const interceptorId = serverClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const requestUrl = originalRequest?.url ?? "";

        if (
          error.response?.status === 401 &&
          !originalRequest?._retry &&
          requestUrl !== "/login"
        ) {
          originalRequest._retry = true;
          const refreshed = await refreshSession();
          if (refreshed) {
            return serverClient(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );

    const authInterceptorId = authClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const requestUrl = originalRequest?.url ?? "";

        if (
          error.response?.status === 401 &&
          !originalRequest?._retry &&
          requestUrl !== "/refresh" &&
          requestUrl !== "/me"
        ) {
          originalRequest._retry = true;
          const refreshed = await refreshSession();
          if (refreshed) {
            return authClient(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      serverClient.interceptors.response.eject(interceptorId);
      authClient.interceptors.response.eject(authInterceptorId);
    };
  }, [refreshSession]);

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await loginAdmin(payload);
    if (response.success && response.data?.user) {
      setAdmin(response.data.user);
    }
    return response;
  }, []);

  const logout = useCallback(async () => {
    await logoutAdmin();
    setAdmin(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      admin,
      loading,
      isAuthenticated,
      login,
      logout,
      refreshSession,
    }),
    [admin, loading, isAuthenticated, login, logout, refreshSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
