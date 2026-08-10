"use client";


import { useAuth } from '@/hooks/useAuth';


export default function WelcomeHeader() {
  const {user}= useAuth();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200/80 dark:border-gray-700 p-6 flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-4 sm:gap-6">
      <div className="flex flex-col justify-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
          Welcome back, {user?.FirstName || "User"}! 👋
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your orders, profile, and wishlist</p>
      </div>
    </div>
  );
}
