import React, { useState } from "react";

import { LogOut, UserCircleIcon, Bell } from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";
import NotificationModal from "./NotificationModal";

export default function Header(): React.ReactElement {
  const { admin, logout } = useAuth();
  const {
    notifications,
    unreadCount,
    isLoading,
    clearNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotification();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const displayName = admin
    ? `${admin.FirstName} ${admin.LastName}`.trim() || admin.email
    : "Admin";

  const handleLogout = async (): Promise<void> => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-end gap-3 sm:gap-4 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs mb-4">
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsNotificationOpen((prev) => !prev)}
          aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} new)` : ""}`}
          aria-expanded={isNotificationOpen}
          aria-haspopup="dialog"
          className="relative p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-xs ring-2 ring-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>

        <NotificationModal
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
          notifications={notifications}
          onClearAll={clearNotifications}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          isLoading={isLoading}
        />
      </div>

      <div className="h-5 w-px bg-gray-200" aria-hidden="true" />

      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100/80 text-blue-600 flex items-center justify-center shrink-0">
            <UserCircleIcon className="w-5 h-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs text-gray-400 font-medium hidden sm:block leading-none">
              Welcome
            </span>
            <span
              className="text-sm font-semibold text-gray-800 truncate max-w-[110px] sm:max-w-[160px] md:max-w-[220px]"
              title={displayName}
            >
              {displayName}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          aria-label="Logout"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 sm:px-3 text-xs sm:text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all focus:outline-none focus:ring-2 focus:ring-red-500/20 active:bg-gray-100 shrink-0"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

