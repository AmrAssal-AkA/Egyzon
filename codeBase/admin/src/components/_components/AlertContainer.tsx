import React from "react";
import { createPortal } from "react-dom";

import AlertToast from "../AlertToast";
import type { AlertItem } from "../../types/alert";

interface AlertContainerProps {
  alerts: AlertItem[];
  onDismiss: (id: string) => void;
}

export default function AlertContainer({
  alerts,
  onDismiss,
}: AlertContainerProps): React.ReactPortal | null {
  if (alerts.length === 0) {
    return null;
  }

  return createPortal(
    <div
      aria-label="Notifications"
      className="pointer-events-none fixed inset-x-0 top-4 z-[9999] flex flex-col items-center gap-3 px-4 sm:items-end sm:pr-6"
    >
      {alerts.map((alert) => (
        <AlertToast key={alert.id} alert={alert} onDismiss={onDismiss} />
      ))}
    </div>,
    document.body,
  );
}
