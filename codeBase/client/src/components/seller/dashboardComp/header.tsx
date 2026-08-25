"use client";

import React, { useState } from 'react'
import { UserCircleIcon, BellIcon } from "lucide-react"
import { ModeToggle } from '@/components/ui/ModeToggle'
import { useAuth } from '@/hooks/useAuth'
import { useNotificationStore } from '@/stores/seller/useNotificationStore'
import NotificationModal from '@/components/seller/common/NotificationModal'

export default function SellerHeader() {
  const { user } = useAuth();
  const unreadCount = useNotificationStore((state) =>
    state.notifications.filter((n) => !n.isRead).length
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sellerName = user ? `${user.FirstName} ${user.LastName}` : "Seller";

  return (
    <>
      <header className="w-full py-4 px-6 sm:px-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white rounded-xl shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors duration-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Welcome <span className="text-blue-600 dark:text-blue-400">{sellerName}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage your store and products efficiently
          </p>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 self-end sm:self-auto">
          <ModeToggle />
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => setIsModalOpen(true)}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 focus:outline-none cursor-pointer"
          >
            <BellIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center px-1 rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-xs animate-in zoom-in">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="User Profile"
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 focus:outline-none cursor-pointer flex items-center justify-center overflow-hidden"
          >
            {user?.image ? (
              <img
                src={user.image}
                alt={sellerName}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
            ) : (
              <UserCircleIcon className="w-6 h-6 sm:w-7 sm:h-7" />
            )}
          </button>
        </div>
      </header>

      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}



