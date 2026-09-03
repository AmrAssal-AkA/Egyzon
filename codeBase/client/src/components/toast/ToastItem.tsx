"use client";

import React, { useEffect } from "react";
import { AlertCircle, CheckCircle2, RotateCw, X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Toast, removeToast, updateToast } from "@/stores/toast";
import { cn } from "@/lib/utils";

interface ToastItemProps {
  toast: Toast;
}

export function ToastItem({ toast }: ToastItemProps) {
  const { id, status, progress, message, onRetry } = toast;


  useEffect(() => {
    if (status !== "success") return;

    const timer = setTimeout(() => {
      removeToast(id);
    }, 3500);

    return () => clearTimeout(timer);
  }, [id, status]);

  const handleRetry = () => {
    updateToast(id, {
      status: "loading",
      progress: 0,
      message: "Retrying upload...",
    });

    if (onRetry) {
      onRetry();
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return <Spinner className="size-4 shrink-0 text-blue-600 dark:text-blue-400" />;
      case "success":
        return <CheckCircle2 className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />;
      case "error":
        return <AlertCircle className="size-4 shrink-0 text-destructive" />;
    }
  };

  const getProgressBarColor = () => {
    switch (status) {
      case "loading":
        return "bg-blue-600 dark:bg-blue-500";
      case "success":
        return "bg-emerald-600 dark:bg-emerald-500";
      case "error":
        return "bg-destructive";
    }
  };

  return (
    <div
      role="status"
      aria-live={status === "error" ? "assertive" : "polite"}
      className={cn(
        "pointer-events-auto relative flex w-full flex-col gap-2.5 rounded-xl border p-4 shadow-lg transition-all duration-200",
        "bg-card text-card-foreground",
        status === "error"
          ? "border-destructive/30 bg-destructive/5"
          : "border-border bg-background/95 backdrop-blur-sm"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {getStatusIcon()}
          <p className="truncate text-sm font-medium text-foreground leading-tight">
            {message}
          </p>
        </div>

        <button
          type="button"
          onClick={() => removeToast(id)}
          className="shrink-0 rounded-md p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Dismiss notification"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Determinate Progress Indicator */}
      <div className="flex items-center gap-2">
        <div
          role="progressbar"
          aria-label="Upload progress"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1.5 w-full overflow-hidden rounded-full bg-secondary"
        >
          <div
            className={cn("h-full transition-all duration-300 ease-out", getProgressBarColor())}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
        <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
          {Math.round(progress)}%
        </span>
      </div>

      {/* Error Retry Action */}
      {status === "error" && onRetry && (
        <div className="flex items-center justify-end pt-1">
          <Button
            size="sm"
            variant="outline"
            onClick={handleRetry}
            className="h-7 gap-1.5 px-2.5 text-xs font-medium"
            aria-label="Retry upload"
          >
            <RotateCw className="size-3" />
            Retry
          </Button>
        </div>
      )}
    </div>
  );
}
