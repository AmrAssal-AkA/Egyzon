import type { AlertContextValue, AlertOptions } from "../types/alert";

type AlertHandlers = Pick<
  AlertContextValue,
  "showAlert" | "showSuccess" | "showError" | "showWarning" | "showInfo" | "dismissAlert" | "clearAlerts"
>;

let alertHandlers: AlertHandlers | null = null;

export function registerAlertHandlers(handlers: AlertHandlers): void {
  alertHandlers = handlers;
}

export function unregisterAlertHandlers(): void {
  alertHandlers = null;
}

function requireHandlers(): AlertHandlers {
  if (!alertHandlers) {
    throw new Error("Alert service is not initialized. Wrap the app with AlertProvider.");
  }

  return alertHandlers;
}

export function showAlert(options: AlertOptions): string {
  return requireHandlers().showAlert(options);
}

export function showSuccess(
  message: string,
  options?: Omit<AlertOptions, "message" | "variant">
): string {
  return requireHandlers().showSuccess(message, options);
}

export function showError(
  message: string,
  options?: Omit<AlertOptions, "message" | "variant">
): string {
  return requireHandlers().showError(message, options);
}

export function showWarning(
  message: string,
  options?: Omit<AlertOptions, "message" | "variant">
): string {
  return requireHandlers().showWarning(message, options);
}

export function showInfo(
  message: string,
  options?: Omit<AlertOptions, "message" | "variant">
): string {
  return requireHandlers().showInfo(message, options);
}

export function dismissAlert(id: string): void {
  requireHandlers().dismissAlert(id);
}

export function clearAlerts(): void {
  requireHandlers().clearAlerts();
}
