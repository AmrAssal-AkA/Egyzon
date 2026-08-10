import React from 'react'
import { UserCircleIcon, BellIcon } from "lucide-react"
import { ModeToggle } from '@/components/ui/ModeToggle'

export default function SellerHeader() {
  return (
    <header className="w-full py-4 px-6 sm:px-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white rounded-xl shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors duration-200">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Welcome <span className="text-blue-600 dark:text-blue-400">Seller</span>
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
          className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 focus:outline-none cursor-pointer"
        >
          <BellIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          type="button"
          aria-label="User Profile"
          className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all duration-200 focus:outline-none cursor-pointer"
        >
          <UserCircleIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>
      </div>
    </header>
  )
}

