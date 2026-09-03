import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import AlertContainer from "../components/_components/AlertContainer";
import {
  registerAlertHandlers,
  unregisterAlertHandlers,
} from "../services/alert.services";
import type {
  AlertContextValue,
  AlertItem,
  AlertOptions,
} from "../types/alert";

const DEFAULT_DURATION = 5000;

export const AlertContext = createContext<AlertContextValue | null>(null);

function createAlertId(): string {
  return `alert-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function buildAlertItem(options: AlertOptions): AlertItem {
  return {
    id: createAlertId(),
    title: options.title,
    message: options.message,
    variant: options.variant ?? "info",
    duration: options.duration ?? DEFAULT_DURATION,
    dismissible: options.dismissible ?? true,
    action: options.action,
  };
}

interface AlertProviderProps {
  children: React.ReactNode;
}

export function AlertProvider({
  children,
}: AlertProviderProps): React.ReactElement {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );

  const clearTimer = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const dismissAlert = useCallback(
    (id: string) => {
      clearTimer(id);
      setAlerts((current) => current.filter((alert) => alert.id !== id));
    },
    [clearTimer],
  );

  const scheduleDismiss = useCallback(
    (alert: AlertItem) => {
      if (alert.duration <= 0) {
        return;
      }

      const timer = setTimeout(() => {
        dismissAlert(alert.id);
      }, alert.duration);

      timersRef.current.set(alert.id, timer);
    },
    [dismissAlert],
  );

  const showAlert = useCallback(
    (options: AlertOptions): string => {
      const alert = buildAlertItem(options);
      setAlerts((current) => [...current, alert]);
      scheduleDismiss(alert);
      return alert.id;
    },
    [scheduleDismiss],
  );

  const showSuccess = useCallback(
    (
      message: string,
      options?: Omit<AlertOptions, "message" | "variant">,
    ): string => showAlert({ ...options, message, variant: "success" }),
    [showAlert],
  );

  const showError = useCallback(
    (
      message: string,
      options?: Omit<AlertOptions, "message" | "variant">,
    ): string => showAlert({ ...options, message, variant: "error" }),
    [showAlert],
  );

  const showWarning = useCallback(
    (
      message: string,
      options?: Omit<AlertOptions, "message" | "variant">,
    ): string => showAlert({ ...options, message, variant: "warning" }),
    [showAlert],
  );

  const showInfo = useCallback(
    (
      message: string,
      options?: Omit<AlertOptions, "message" | "variant">,
    ): string => showAlert({ ...options, message, variant: "info" }),
    [showAlert],
  );

  const clearAlerts = useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer));
    timersRef.current.clear();
    setAlerts([]);
  }, []);

  const value = useMemo<AlertContextValue>(
    () => ({
      alerts,
      showAlert,
      showSuccess,
      showError,
      showWarning,
      showInfo,
      dismissAlert,
      clearAlerts,
    }),
    [
      alerts,
      showAlert,
      showSuccess,
      showError,
      showWarning,
      showInfo,
      dismissAlert,
      clearAlerts,
    ],
  );

  useEffect(() => {
    registerAlertHandlers(value);
    const timers = timersRef.current;

    return () => {
      unregisterAlertHandlers();
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, [value]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      <AlertContainer alerts={alerts} onDismiss={dismissAlert} />
    </AlertContext.Provider>
  );
}
