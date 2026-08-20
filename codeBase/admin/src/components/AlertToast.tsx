import React from "react";
import { AlertCircle, CheckCircle2, Info, X, XCircle } from "lucide-react";

import type { AlertItem, AlertVariant } from "../types/alert";

interface AlertToastProps {
  alert: AlertItem;
  onDismiss: (id: string) => void;
}

const variantStyles: Record<
  AlertVariant,
  { container: string; icon: string; iconBg: string }
> = {
  success: {
    container: "border-emerald-200 bg-emerald-50",
    icon: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  error: {
    container: "border-rose-200 bg-rose-50",
    icon: "text-rose-600",
    iconBg: "bg-rose-100",
  },
  warning: {
    container: "border-amber-200 bg-amber-50",
    icon: "text-amber-600",
    iconBg: "bg-amber-100",
  },
  info: {
    container: "border-blue-200 bg-blue-50",
    icon: "text-blue-600",
    iconBg: "bg-blue-100",
  },
};

const variantIcons: Record<AlertVariant, React.ReactNode> = {
  success: <CheckCircle2 className="h-5 w-5" aria-hidden="true" />,
  error: <XCircle className="h-5 w-5" aria-hidden="true" />,
  warning: <AlertCircle className="h-5 w-5" aria-hidden="true" />,
  info: <Info className="h-5 w-5" aria-hidden="true" />,
};

export default function AlertToast({ alert, onDismiss }: AlertToastProps): React.ReactElement {
  const styles = variantStyles[alert.variant];

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg ring-1 ring-black/5 transition-all duration-300 ${styles.container}`}
    >
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${styles.iconBg} ${styles.icon}`}>
        {variantIcons[alert.variant]}
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        {alert.title && (
          <p className="text-sm font-semibold text-gray-900">{alert.title}</p>
        )}
        <p className={`text-sm text-gray-700 ${alert.title ? "mt-1" : ""}`}>
          {alert.message}
        </p>

        {alert.action && (
          <button
            type="button"
            onClick={() => {
              alert.action?.onClick();
              onDismiss(alert.id);
            }}
            className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            {alert.action.label}
          </button>
        )}
      </div>

      {alert.dismissible && (
        <button
          type="button"
          aria-label="Dismiss alert"
          onClick={() => onDismiss(alert.id)}
          className="shrink-0 rounded-md p-1 text-gray-500 transition-colors hover:bg-black/5 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
