import React, { useState, useCallback } from "react";
import {
  Landmark,
  Calendar,
  Download,
  RotateCw,
  ShieldCheck,
} from "lucide-react";

import {
  useFinancialSummary,
  usePlatformFee,
  useSalesOverview,
  useTotalSales,
  useWithdrawalCompletedCount,
  useWithdrawalRequests,
} from "../../hooks/useFinancial";
import type { WithdrawalFilters } from "../../types/financial";
import {
  FinancialSummary,
  PlatformFeeCard,
  SalesOverviewChart,
  WithdrawalRequestsTable,
} from "../../components/financial";
import { useAlert } from "../../hooks/useAlert";

function FinancialPage(): React.ReactElement {
  const { showSuccess } = useAlert();
  const [filters, setFilters] = useState<WithdrawalFilters>({
    searchQuery: "",
    status: "all",
    paymentMethod: "all",
    dateRange: "all",
    page: 1,
    limit: 6,
  });

  // Hooks for financial data
  const {
    summary,
    isLoading: isSummaryLoading,
    refresh: refreshSummary,
  } = useFinancialSummary();

  const {
    totalSales,
    isLoading: isTotalSalesLoading,
    error: totalSalesError,
    refresh: refreshTotalSales,
  } = useTotalSales();

  const {
    completedCount: completedWithdrawalCount,
    isLoading: isCompletedWithdrawalCountLoading,
    refresh: refreshCompletedWithdrawalCount,
  } = useWithdrawalCompletedCount();

  const {
    salesData,
    overview: salesOverview,
    isLoading: isSalesLoading,
    error: salesError,
    refresh: refreshSales,
  } = useSalesOverview();

  const {
    feeData,
    isLoading: isFeeLoading,
    refresh: refreshFee,
  } = usePlatformFee();

  const {
    requests,
    pagination,
    counts,
    isLoading: isWithdrawalsLoading,
    error: withdrawalsError,
    actionInProgressId,
    approveRequest,
    rejectRequest,
    refresh: refreshWithdrawals,
  } = useWithdrawalRequests(filters);

  const [isRefreshingAll, setIsRefreshingAll] = useState<boolean>(false);

  const handleFilterChange = useCallback((newFilters: Partial<WithdrawalFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const handleRefreshAll = async () => {
    setIsRefreshingAll(true);
    await Promise.all([
      refreshSummary(),
      refreshTotalSales(),
      refreshCompletedWithdrawalCount(),
      refreshSales(),
      refreshFee(),
      refreshWithdrawals(),
    ]);
    setIsRefreshingAll(false);
    showSuccess("Financial data updated successfully.");
  };

  const handleExportReport = () => {
    const headers = [
      "Request ID",
      "Seller Name",
      "Email",
      "Store Name",
      "Amount (EGP)",
      "Payment Method",
      "Date",
      "Status",
    ];

    const rows = requests.map((r) => [
      r.id,
      `"${r.sellerName}"`,
      r.sellerEmail,
      `"${r.storeName}"`,
      r.requestedAmount,
      `"${r.paymentMethod}"`,
      r.requestDate,
      r.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `egyzon-financial-report-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showSuccess("Financial report exported successfully.");
  };

  const todayFormatted = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <title>Financial Management | Egyzon Admin</title>
      <main className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-2xs shrink-0">
              <Landmark className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  Financial Management
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Admin Executive Center
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Marketplace-wide sales performance, platform commission revenue, and merchant withdrawal operations.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-gray-700 border border-gray-200 shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              {todayFormatted}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Marketplace Sync
            </span>

            <button
              type="button"
              onClick={handleRefreshAll}
              disabled={isRefreshingAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 shadow-2xs transition-colors"
              title="Refresh all financial data"
            >
              <RotateCw
                className={`w-3.5 h-3.5 text-gray-500 ${
                  isRefreshingAll ? "animate-spin" : ""
                }`}
              />
              Sync
            </button>

            <button
              type="button"
              onClick={handleExportReport}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-900 text-white hover:bg-gray-800 active:bg-black shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export Report
            </button>
          </div>
        </div>

        {/* SECTION 4: Financial Summary (Marketplace-wide KPIs) */}
        <FinancialSummary
          summary={summary}
          isLoading={isSummaryLoading}
          totalSales={totalSales}
          isTotalSalesLoading={isTotalSalesLoading}
          totalSalesError={totalSalesError}
          completedWithdrawalCount={completedWithdrawalCount}
          isCompletedWithdrawalCountLoading={isCompletedWithdrawalCountLoading}
        />

        {/* SECTIONS 1 & 2: Sales Overview Chart (12 Months) + Platform Fee Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Section 1: Sales Overview (30-day marketplace analytics chart) */}
          <SalesOverviewChart
            data={salesData}
            overview={salesOverview}
            isLoading={isSalesLoading}
            error={salesError}
            className="lg:col-span-2"
          />

          {/* Section 2: Platform Fee (Prominent revenue driver card) */}
          <PlatformFeeCard
            data={feeData as React.ComponentProps<typeof PlatformFeeCard>["data"]}
            isLoading={isFeeLoading}
            className="lg:col-span-1"
          />
        </div>

        {/* SECTION 3: Seller Withdrawal Requests Management Table */}
        <WithdrawalRequestsTable
          requests={requests}
          pagination={pagination}
          counts={counts}
          isLoading={isWithdrawalsLoading}
          error={withdrawalsError}
          filters={filters}
          onFilterChange={handleFilterChange}
          onApprove={approveRequest}
          onReject={rejectRequest}
          onRefresh={refreshWithdrawals}
          actionInProgressId={actionInProgressId}
        />
      </main>
    </>
  );
}

export default FinancialPage;