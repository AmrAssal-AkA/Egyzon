export type AlertVariant = "success" | "error" | "warning" | "info";

export interface AlertAction {
  label: string;
  onClick: () => void;
}

export interface AlertOptions {
  title?: string;
  message: string;
  variant?: AlertVariant;
  duration?: number;
  dismissible?: boolean;
  action?: AlertAction;
}

export interface AlertItem extends Required<Pick<AlertOptions, "message">> {
  id: string;
  title?: string;
  variant: AlertVariant;
  duration: number;
  dismissible: boolean;
  action?: AlertAction;
}

export interface AlertContextValue {
  alerts: AlertItem[];
  showAlert: (options: AlertOptions) => string;
  showSuccess: (message: string, options?: Omit<AlertOptions, "message" | "variant">) => string;
  showError: (message: string, options?: Omit<AlertOptions, "message" | "variant">) => string;
  showWarning: (message: string, options?: Omit<AlertOptions, "message" | "variant">) => string;
  showInfo: (message: string, options?: Omit<AlertOptions, "message" | "variant">) => string;
  dismissAlert: (id: string) => void;
  clearAlerts: () => void;
}
