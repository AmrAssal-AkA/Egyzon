"use client";

import React from "react";
import { TrendingUp, Clock3 } from "lucide-react";

interface OrdersMetricsProps {
  totalOrders: number;
  pendingCount: number;
  totalRevenue: number;
  isLoading?: boolean;
}

export default function OrdersMetrics({
  totalOrders,
  pendingCount,
  totalRevenue,
  isLoading = false,
}: OrdersMetricsProps) {
  const formattedRevenue = `EGP ${totalRevenue.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      {/* Card 1: Total Orders */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            TOTAL ORDERS
          </span>
          <div className="mt-2">
            {isLoading ? (
              <div className="h-9 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
            ) : (
              <span className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {totalOrders.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+12% this month</span>
        </div>
      </div>

      {/* Card 2: Pending Fulfillment */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            PENDING FULFILLMENT
          </span>
          <div className="mt-2">
            {isLoading ? (
              <div className="h-9 w-16 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
            ) : (
              <span className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {pendingCount.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
          <Clock3 className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
          <span>Requires attention</span>
        </div>
      </div>

      {/* Card 3: Revenue */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-4">
        {/* Soft decorative glow background */}
        <div className="pointer-events-none absolute -right-8 -top-8 w-36 h-36 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-2xl" />

        <div className="relative z-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            REVENUE
          </span>
          <div className="mt-2">
            {isLoading ? (
              <div className="h-9 w-36 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
            ) : (
              <span className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                {formattedRevenue}
              </span>
            )}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+8% this month</span>
        </div>
      </div>
    </div>
  );
}
