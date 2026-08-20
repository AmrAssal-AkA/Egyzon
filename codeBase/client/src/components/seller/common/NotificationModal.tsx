"use client";

import React, { useEffect } from "react";
import {
  XIcon,
  BellIcon,
  CheckCheckIcon,
  Trash2Icon,
  PackageIcon,
  ShoppingBagIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  XCircleIcon,
  InfoIcon,
} from "lucide-react";
import { useNotificationStore } from "@/stores/seller/useNotificationStore";
import type { NotificationPayload } from "@/types/socket-events";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function getNotificationIcon(type?: string) {
  switch (type) {
    case "order":
      return <ShoppingBagIcon className="w-5 h-5 text-blue-500" />;
    case "inventory":
    case "low_stock":
      return <AlertTriangleIcon className="w-5 h-5 text-amber-500" />;
    case "seller_approved":
      return <CheckCircle2Icon className="w-5 h-5 text-emerald-500" />;
    case "seller_rejected":
      return <XCircleIcon className="w-5 h-5 text-rose-500" />;
    case "product":
      return <PackageIcon className="w-5 h-5 text-purple-500" />;
    default:
      return <InfoIcon className="w-5 h-5 text-blue-500" />;
  }
}

function formatRelativeTime(dateString?: string): string {
  if (!dateString) return "Just now";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  } catch {
    return "Just now";
  }
}

export default function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } =
    useNotificationStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs transition-all animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-top-4 sm:slide-in-from-top-6 duration-200 mt-14 sm:mt-16 mr-0 sm:mr-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 dark:bg-blue-950/50 rounded-xl text-blue-600 dark:text-blue-400">
              <BellIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                Notifications
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-blue-600 text-white rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Seller activity & system alerts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        {notifications.length > 0 && (
          <div className="px-5 py-2 bg-slate-50/80 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <CheckCheckIcon className="w-4 h-4" />
              Mark all read
            </button>
            <button
              onClick={clearNotifications}
              className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer transition-colors"
            >
              <Trash2Icon className="w-4 h-4" />
              Clear all
            </button>
          </div>
        )}

        {/* Notifications Content List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
          {notifications.length === 0 ? (
            <div className="py-12 px-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                <BellIcon className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                No notifications yet
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[220px]">
                When order updates, stock alerts, or messages arrive, they will appear here.
              </p>
            </div>
          ) : (
            notifications.map((item: NotificationPayload) => (
              <div
                key={item.id}
                onClick={() => markAsRead(item.id)}
                className={`p-4 flex items-start gap-3.5 transition-colors cursor-pointer ${
                  !item.isRead
                    ? "bg-blue-50/40 dark:bg-blue-950/20 hover:bg-blue-50/70 dark:hover:bg-blue-950/30"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                  {getNotificationIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className={`text-xs font-semibold truncate ${!item.isRead ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                      {item.title}
                    </h3>
                    <span className="text-[10px] text-slate-400 shrink-0 whitespace-nowrap">
                      {formatRelativeTime(item.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {item.message}
                  </p>
                </div>

                {!item.isRead && (
                  <span
                    className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2"
                    title="Unread"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Backdrop overlay listener */}
      <div
        className="fixed inset-0 -z-10"
        onClick={onClose}
      />
    </div>
  );
}
