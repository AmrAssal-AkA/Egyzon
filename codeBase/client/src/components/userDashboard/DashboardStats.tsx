"use client";
import React from "react";

import { Package, Heart, DollarSign } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useWishlistCount } from "@/stores/buyer/wishlist";

export default function DashboardStats() {
  const { user } = useAuth();
  const wishlistCount = useWishlistCount();

  if (!user) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 p-6">
        User data not available. Please log in.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4">
        <div className="p-3 bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full">
          <Package className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Orders
          </p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {/* totalOrders: requires a separate orders API call */}
            {0}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4">
        <div className="p-3 bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 rounded-full">
          <Heart className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Wishlist Items
          </p>
          {wishlistCount > 0 ? (
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {wishlistCount}
            </p>
          ) : (
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              0
            </p>
          )}
        </div>
      </div>



      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4">
        <div className="p-3 bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 rounded-full">
          <DollarSign className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Spent
          </p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {/* totalSpend: requires a separate orders API call */}
            {(0).toFixed(2)} EGP
          </p>
        </div>
      </div>
    </div>
  );
}
