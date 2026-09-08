"use client";

import React, { useState, useMemo } from "react";

import Link from "next/link";

import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Download,
  ChevronLeft,
  ChevronRight,
  Search,
  AlertCircle,
} from "lucide-react";

import { useSellerTransactions } from "@/hooks/useSeller";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  TransactionQueryState,
  TransactionTableProps,
  TransactionType,
  TransactionStatus,
} from "@/types/wallet";

export default function TransactionTable({
  transactions: controlledTransactions,
  isLoading: controlledLoading = false,
  totalCount: controlledTotalCount,
  queryState: controlledQueryState,
  onQueryChange,
  onExport,
  showViewAllLink = false,
}: TransactionTableProps) {
  // --- Uncontrolled State (Fallback) ---
  const [internalQuery, setInternalQuery] = useState<TransactionQueryState>({
    page: 1,
    limit: 10,
    status: "all",
    type: "all",
    sortBy: "date",
    sortOrder: "desc",
    searchTerm: "",
  });

  // Decide if we are in controlled or uncontrolled mode
  const isControlled = controlledTransactions !== undefined;
  const currentQuery =
    isControlled && controlledQueryState
      ? { ...internalQuery, ...controlledQueryState }
      : internalQuery;

  // Fetch real transactions via SWR when in uncontrolled mode
  const {
    transactions: swrTransactions,
    totalTransactions: swrTotalTransactions,
    isLoading: swrLoading,
  } = useSellerTransactions(
    isControlled ? 1 : currentQuery.page,
    isControlled ? 10 : currentQuery.limit,
  );

  const isLoading = controlledLoading || (!isControlled && swrLoading);

  const updateQuery = (updates: Partial<TransactionQueryState>) => {
    if (onQueryChange) {
      onQueryChange(updates);
    } else {
      setInternalQuery((prev) => {
        const next = { ...prev, ...updates };

        if (
          updates.status ||
          updates.type ||
          updates.searchTerm !== undefined
        ) {
          next.page = 1;
        }
        return next;
      });
    }
  };

  const rawTransactions = isControlled
    ? controlledTransactions!
    : swrTransactions;

  // --- Filtering & Sorting Logic ---
  const filteredTransactions = useMemo(() => {
    let result = [...rawTransactions];

    // Filter by type
    if (currentQuery.type !== "all") {
      result = result.filter((t) => t.type === currentQuery.type);
    }

    // Filter by status
    if (currentQuery.status !== "all") {
      result = result.filter((t) => t.status === currentQuery.status);
    }

    // Filter by Search Term (ID)
    if (currentQuery.searchTerm) {
      result = result.filter((t) =>
        t.id.toLowerCase().includes(currentQuery.searchTerm.toLowerCase()),
      );
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      if (currentQuery.sortBy === "date") {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (currentQuery.sortBy === "id") {
        comparison = a.id.localeCompare(b.id);
      } else if (currentQuery.sortBy === "amount") {
        comparison = a.amount - b.amount;
      }

      return currentQuery.sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [rawTransactions, currentQuery]);

  const hasLocalFilters =
    currentQuery.type !== "all" ||
    currentQuery.status !== "all" ||
    Boolean(currentQuery.searchTerm);

  const totalItems = isControlled
    ? (controlledTotalCount ?? rawTransactions.length)
    : hasLocalFilters
      ? filteredTransactions.length
      : swrTotalTransactions;

  const totalPages = Math.max(1, Math.ceil(totalItems / currentQuery.limit));

  // In uncontrolled mode, transactions are already server-paginated; in controlled mode without totalCount, slice locally
  const paginatedTransactions = useMemo(() => {
    if (isControlled && controlledTotalCount === undefined) {
      const startIndex = (currentQuery.page - 1) * currentQuery.limit;
      return filteredTransactions.slice(startIndex, startIndex + currentQuery.limit);
    }
    return filteredTransactions;
  }, [isControlled, controlledTotalCount, filteredTransactions, currentQuery.page, currentQuery.limit]);


  // --- Formatter Helpers ---

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return isoString;
    }
  };

  const formatAmount = (
    amount: number,
    type: TransactionType,
    currency: string,
  ) => {
    const absAmount = Math.abs(amount).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const prefix = type === "sale" ? "+" : "-";
    const symbol = currency === "USD" ? "$" : " EGP";

    if (currency === "USD") {
      return `${prefix}${symbol}${absAmount}`;
    }
    return `${prefix}${absAmount}${symbol}`;
  };

  // --- Interactive Handlers ---

  const handleSort = (field: "date" | "id" | "amount") => {
    const isAsc =
      currentQuery.sortBy === field && currentQuery.sortOrder === "asc";
    const newOrder = isAsc ? "desc" : "asc";
    updateQuery({ sortBy: field, sortOrder: newOrder });
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
      return;
    }

    // Default Client-side CSV Exporter
    const dataToExport = filteredTransactions;
    if (dataToExport.length === 0) return;

    const headers = [
      "Date",
      "Transaction ID",
      "Type",
      "Amount",
      "Currency",
      "Status",
    ];
    const rows = dataToExport.map((t) => [
      formatDate(t.date),
      t.id,
      t.type,
      t.amount,
      t.currency,
      t.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `egyzon_transactions_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- UI Mini-Renderers ---

  const getTypeDotColor = (type: TransactionType) => {
    switch (type) {
      case "sale":
        return "bg-emerald-600 dark:bg-emerald-400";
      case "fee":
        return "bg-rose-600 dark:bg-rose-400";
      case "payout":
        return "bg-blue-600 dark:bg-blue-400";
      case "refund":
        return "bg-amber-300 dark:bg-amber-200";
      default:
        return "bg-slate-400";
    }
  };

  const getStatusBadgeStyles = (status: TransactionStatus) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400";
      case "pending":
        return "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400";
      case "failed":
        return "bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400";
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200";
    }
  };

  // Sorting Header Helper
  const SortableHeader = ({
    field,
    label,
  }: {
    field: "date" | "id" | "amount";
    label: string;
  }) => {
    const isActive = currentQuery.sortBy === field;
    return (
      <button
        onClick={() => handleSort(field)}
        className="flex items-center gap-1.5 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer text-left font-semibold uppercase text-xs"
      >
        {label}
        {isActive ? (
          currentQuery.sortOrder === "asc" ? (
            <ArrowUp className="h-3.5 w-3.5 text-blue-500" />
          ) : (
            <ArrowDown className="h-3.5 w-3.5 text-blue-500" />
          )
        ) : (
          <ArrowUpDown className="h-3.5 w-3.5 text-slate-400 opacity-60 hover:opacity-100" />
        )}
      </button>
    );
  };

  // Skeletons
  const SkeletonRow = () => (
    <tr className="animate-pulse border-b border-slate-100 dark:border-slate-800">
      <td className="px-6 py-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-28"></div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-slate-800"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-12"></div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-20"></div>
      </td>
    </tr>
  );

  return (
    <div className="w-full h-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col gap-1 transition-all duration-300">
      {/* --- Card Header --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Recent Transactions
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Overview of your store earnings, payouts, and fees.
          </p>
        </div>

        {/* --- Header Controls --- */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search ID..."
              value={currentQuery.searchTerm}
              onChange={(e) => updateQuery({ searchTerm: e.target.value })}
              className="pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-lg text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-44"
            />
          </div>


          {/* Export Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="gap-2 h-9 px-3 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium cursor-pointer"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* --- Table Container --- */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800/80">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/50">
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider text-left">
                Date
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider text-left">
                Transaction ID
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider text-left">
                Type
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider text-left">
                Amount
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 bg-white dark:bg-slate-900">
            {isLoading ? (
              // Loading Skeleton list
              Array.from({ length: currentQuery.limit }).map((_, i) => (
                <SkeletonRow key={i} />
              ))
            ) : paginatedTransactions.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="p-3 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white">
                        No transactions found
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Try adjusting your search terms or filters.
                      </p>
                    </div>
                    {(currentQuery.status !== "all" ||
                      currentQuery.type !== "all" ||
                      currentQuery.searchTerm) && (
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() =>
                          updateQuery({
                            status: "all",
                            type: "all",
                            searchTerm: "",
                          })
                        }
                        className="text-blue-500 font-medium cursor-pointer"
                      >
                        Reset filters
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              // Actual transaction rows
              paginatedTransactions.map((trx) => (
                <tr
                  key={trx.id}
                  className="hover:bg-slate-50/40 dark:hover:bg-slate-800/25 transition-colors group border-b border-slate-100 dark:border-slate-800/40"
                >
                  {/* Date Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 dark:text-slate-300 font-medium">
                    {formatDate(trx.date)}
                  </td>

                  {/* Transaction ID Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100 font-mono font-medium">
                    <span className="underline hover:text-blue-500 cursor-pointer transition-colors">
                      {trx.id}
                    </span>
                  </td>

                  {/* Type Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">
                    <div className="flex items-center gap-2 font-medium capitalize">
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          getTypeDotColor(trx.type),
                        )}
                      />
                      {trx.type}
                    </div>
                  </td>

                  {/* Amount Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <span
                      className={cn(
                        trx.type === "sale"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-slate-900 dark:text-slate-100",
                      )}
                    >
                      {formatAmount(trx.amount, trx.type, trx.currency)}
                    </span>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4 whitespace-nowrap text-xs">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-full font-semibold capitalize",
                        getStatusBadgeStyles(trx.status),
                      )}
                    >
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- Footer Controls --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 px-6 gap-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
        {/* Total stats info */}
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {isLoading ? (
            <span className="inline-block h-3 bg-slate-200 dark:bg-slate-800 rounded w-48 animate-pulse"></span>
          ) : (
            `Showing ${Math.min(
              totalItems,
              (currentQuery.page - 1) * currentQuery.limit + 1,
            )} to ${Math.min(
              totalItems,
              currentQuery.page * currentQuery.limit,
            )} of ${totalItems} transactions`
          )}
        </div>

        {/* View All Button or Pagination controls */}
        {showViewAllLink ? (
          <div className="flex items-center justify-center py-1">
            <Link
              href="/sellerDashboard/wallet/transactions"
              className="text-sm font-semibold text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
            >
              View All Transactions
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {/* Limit Selector */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span>Show</span>
              <select
                value={currentQuery.limit}
                onChange={(e) =>
                  updateQuery({ limit: Number(e.target.value), page: 1 })
                }
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5 font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {[5, 10, 20, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon-sm"
                disabled={currentQuery.page === 1 || isLoading}
                onClick={() => updateQuery({ page: currentQuery.page - 1 })}
                className="h-8 w-8 p-0 border-slate-200 dark:border-slate-700 cursor-pointer disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 px-2">
                Page {currentQuery.page} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="icon-sm"
                disabled={currentQuery.page === totalPages || isLoading}
                onClick={() => updateQuery({ page: currentQuery.page + 1 })}
                className="h-8 w-8 p-0 border-slate-200 dark:border-slate-700 cursor-pointer disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
