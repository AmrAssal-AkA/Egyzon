import React, { useEffect, useRef, useState } from "react";

import {
  AlertCircle,
  AlertTriangle,
  Bell,
  BellOff,
  BellRing,
  CheckCheck,
  CheckCircle2,
  Info,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

import type { NotificationPayload } from "../hooks/useNotification";

export interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationPayload[];
  onClearAll: () => void;
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  isLoading?: boolean;
}

function formatRelativeTime(timestamp: number): string {
  if (!timestamp) return "Just now";
  const diffInSeconds = Math.floor((Date.now() - timestamp) / 1000);
  if (diffInSeconds < 30) return "Just now";
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

const typeConfig = {
  info: {
    icon: <Info className="w-4 h-4 text-blue-600 shrink-0" />,
    bg: "bg-blue-50/40 border-blue-100",
    iconBg: "bg-blue-100",
  },
  success: {
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
    bg: "bg-emerald-50/40 border-emerald-100",
    iconBg: "bg-emerald-100",
  },
  warning: {
    icon: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />,
    bg: "bg-amber-50/40 border-amber-100",
    iconBg: "bg-amber-100",
  },
  error: {
    icon: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />,
    bg: "bg-rose-50/40 border-rose-100",
    iconBg: "bg-rose-100",
  },
};

export default function NotificationModal({
  isOpen,
  onClose,
  notifications,
  onClearAll,
  onMarkAsRead,
  onMarkAllAsRead,
  isLoading = false,
}: NotificationModalProps): React.ReactElement | null {
  const modalRef = useRef<HTMLDivElement>(null);
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      return Notification.permission;
    }
    return "unsupported";
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleRequestPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        const res = await Notification.requestPermission();
        setPermission(res);
      } catch {
        // ignore error
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Notifications"
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-[32rem] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100 bg-gray-50/70">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-gray-700" />
          <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
          {unreadCount > 0 ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
              {unreadCount} new
            </span>
          ) : notifications.length > 0 ? (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
              {notifications.length}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-1">
          {unreadCount > 0 && onMarkAllAsRead && (
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Mark all as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mark read</span>
            </button>
          )}

          {notifications.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Clear all notifications"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close notifications"
            className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Permission Request Banner */}
      {permission === "default" && (
        <div className="flex items-center justify-between px-4 py-2 bg-blue-50 border-b border-blue-100 text-xs text-blue-800">
          <span className="flex items-center gap-1.5 font-medium">
            <BellRing className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            Enable desktop alerts
          </span>
          <button
            type="button"
            onClick={handleRequestPermission}
            className="px-2 py-0.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold text-[11px] transition-colors"
          >
            Enable
          </button>
        </div>
      )}

      {/* Notification List Body */}
      <div className="flex-1 overflow-y-auto max-h-80 divide-y divide-gray-100">
        {isLoading && notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin mb-2" />
            <p className="text-xs text-gray-400">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <BellOff className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-sm font-semibold text-gray-800">No notifications</p>
            <p className="text-xs text-gray-400 mt-1 max-w-[200px]">
              You will be notified here when real-time updates occur.
            </p>
          </div>
        ) : (
          notifications.map((item) => {
            const variant = typeConfig[item.type] || typeConfig.info;
            const isUnread = !item.isRead;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isUnread && onMarkAsRead) {
                    onMarkAsRead(item.id);
                  }
                }}
                className={`flex items-start gap-3 p-3.5 transition-colors cursor-pointer ${
                  isUnread
                    ? `${variant.bg} hover:bg-gray-50/80`
                    : "bg-white hover:bg-gray-50/60 opacity-80"
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${variant.iconBg}`}
                >
                  {variant.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 truncate">
                      {isUnread && (
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"
                          title="Unread"
                        />
                      )}
                      <p
                        className={`text-xs truncate ${
                          isUnread
                            ? "font-bold text-gray-900"
                            : "font-semibold text-gray-700"
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>
                    <span className="text-[10px] text-gray-400 shrink-0">
                      {formatRelativeTime(item.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed break-words">
                    {item.message}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
