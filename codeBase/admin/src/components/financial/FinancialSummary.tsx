import React from "react";

import {
  TrendingUp,
  Coins,
  Landmark,
  Clock,
  CheckCircle2,
  Globe2,
} from "lucide-react";

import { useTotalSales, useWithdrawalCompletedCount } from "../../hooks/useFinancial";
import type { FinancialSummaryMetrics } from "../../types/financial";

export interface FinancialSummaryProps {
  summary: FinancialSummaryMetrics | null;
  isLoading?: boolean;
  className?: string;
  totalSales?: number | null;
  isTotalSalesLoading?: boolean;
  totalSalesError?: string | null;
  completedWithdrawalCount?: number | null;
  isCompletedWithdrawalCountLoading?: boolean;
}

export function FinancialSummary({
  summary,
  isLoading = false,
  className = "",
  totalSales: propTotalSales,
  isTotalSalesLoading: propIsTotalSalesLoading,
  totalSalesError: propTotalSalesError,
  completedWithdrawalCount: propCompletedWithdrawalCount,
  isCompletedWithdrawalCountLoading: propIsCompletedWithdrawalCountLoading,
}: FinancialSummaryProps): React.ReactElement {
  const {
    totalSales: hookTotalSales,
    isLoading: hookTotalSalesLoading,
    error: hookTotalSalesError,
  } = useTotalSales();
  const {
    completedCount: hookCompletedCount,
    isLoading: hookCompletedCountLoading,
  } = useWithdrawalCompletedCount();

  const totalSalesValue =
    propTotalSales !== undefined
      ? propTotalSales
      : hookTotalSales !== null
      ? hookTotalSales
      : summary?.totalSales.value ?? null;

  const isSalesLoading =
    propIsTotalSalesLoading !== undefined
      ? propIsTotalSalesLoading
      : propTotalSales !== undefined
      ? false
      : summary?.totalSales !== undefined
      ? false
      : (isLoading || hookTotalSalesLoading);

  const salesError =
    propTotalSalesError !== undefined
      ? propTotalSalesError
      : hookTotalSalesError;

  const completedWithdrawalsCount =
    propCompletedWithdrawalCount !== undefined
      ? propCompletedWithdrawalCount
      : hookCompletedCount !== null
      ? hookCompletedCount
      : summary?.completedWithdrawals.count ?? null;

  const isCompletedCountLoading =
    propIsCompletedWithdrawalCountLoading !== undefined
      ? propIsCompletedWithdrawalCountLoading
      : propCompletedWithdrawalCount !== undefined
      ? false
      : summary?.completedWithdrawals !== undefined
      ? false
      : (isLoading || hookCompletedCountLoading);

  const formatCurrency = (amount: number): string => {
    return `${amount.toLocaleString()} EGP`;
  };

  return (
    <section
      aria-label="Marketplace Financial Summary"
      className={`space-y-3 ${className}`}
    >
      {/* Marketplace-wide scope label */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          <Globe2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Marketplace-Wide Financial Indicators</span>
        </div>
        <span className="text-[11px] text-gray-400 hidden sm:inline-block">
          Aggregated across all registered vendors & stores
        </span>
      </div>

      {/* 4 Compact Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Total Sales */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Sales
            </span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100/80">
              <Coins className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-2.5">
            {isSalesLoading ? (
              <div className="h-8 w-32 bg-gray-100 animate-pulse rounded" />
            ) : salesError && totalSalesValue === null ? (
              <div className="text-sm font-medium text-red-500">
                Failed to load total sales
              </div>
            ) : totalSalesValue !== null ? (
              <div className="text-2xl font-bold tracking-tight text-gray-900 tabular-nums">
                {formatCurrency(totalSalesValue)}
              </div>
            ) : (
              <div className="text-2xl font-bold tracking-tight text-gray-900 tabular-nums">
                0 EGP
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs">
            {summary?.totalSales?.changePercentage !== undefined ? (
              <>
                <span className="inline-flex items-center gap-0.5 font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                  <TrendingUp className="w-3 h-3" />
                  +{summary.totalSales.changePercentage}%
                </span>
                <span className="text-gray-400">vs previous period</span>
              </>
            ) : (
              <span className="text-gray-400">Gross sales across platform</span>
            )}
          </div>
        </div>

        {/* 2. Total Platform Fees */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Platform Fees
            </span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100/80">
              <Landmark className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-2.5">
            {isLoading || !summary ? (
              <div className="h-8 w-28 bg-gray-100 animate-pulse rounded" />
            ) : (
              <div className="text-2xl font-bold tracking-tight text-gray-900 tabular-nums">
                {formatCurrency(summary.totalPlatformFees.value)}
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs">
            {summary && (
              <>
                <span className="inline-flex items-center gap-0.5 font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                  <TrendingUp className="w-3 h-3" />
                  +{summary.totalPlatformFees.changePercentage}%
                </span>
                <span className="text-gray-400">
                  {summary.totalPlatformFees.feeRate}% commission retained
                </span>
              </>
            )}
          </div>
        </div>

        {/* 3. Pending Withdrawals */}
        <div className="bg-white border border-amber-200/80 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-shadow ring-1 ring-amber-400/20 bg-gradient-to-br from-white to-amber-50/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
              Pending Withdrawals
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-2.5">
            {isLoading || !summary ? (
              <div className="h-8 w-28 bg-gray-100 animate-pulse rounded" />
            ) : (
              <div className="text-2xl font-bold tracking-tight text-gray-900 tabular-nums">
                {formatCurrency(summary.pendingWithdrawals.totalAmount)}
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs">
            {summary && (
              <>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                  {summary.pendingWithdrawals.count} requests awaiting review
                </span>
              </>
            )}
          </div>
        </div>

        {/* 4. Completed Withdrawals */}
        <div className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Completed Withdrawals
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100/80">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-2.5">
            {isLoading || !summary ? (
              <div className="h-8 w-32 bg-gray-100 animate-pulse rounded" />
            ) : (
              <div className="text-2xl font-bold tracking-tight text-gray-900 tabular-nums">
                {formatCurrency(summary.completedWithdrawals.totalAmount)}
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2 text-xs">
            {isCompletedCountLoading || completedWithdrawalsCount === null ? (
              <div className="h-4 w-28 bg-gray-100 animate-pulse rounded" />
            ) : (
              <>
                <span className="inline-flex items-center gap-0.5 font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                  {completedWithdrawalsCount} payouts settled
                </span>
                <span className="text-gray-400">successfully</span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinancialSummary;
