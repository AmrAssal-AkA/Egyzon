import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Landmark,
  Smartphone,
  CreditCard,
  Building,
  RotateCw,
  Eye,
  AlertCircle,
} from "lucide-react";
import type {
  PaymentMethod,
  WithdrawalFilters,
  WithdrawalRequest,
  WithdrawalStatus,
} from "../../types/financial";
import { WithdrawalActionModal, ModalActionType } from "./WithdrawalActionModal";

interface WithdrawalRequestsTableProps {
  requests: WithdrawalRequest[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  counts: {
    all: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  isLoading: boolean;
  error: string | null;
  filters: WithdrawalFilters;
  onFilterChange: (filters: Partial<WithdrawalFilters>) => void;
  onApprove: (requestId: string, sellerId?: string) => Promise<boolean>;
  onReject: (requestId: string, reason: string, sellerId?: string) => Promise<boolean>;
  onRefresh: () => void;
  actionInProgressId: string | null;
}

export function WithdrawalRequestsTable({
  requests,
  pagination,
  counts,
  isLoading,
  error,
  filters,
  onFilterChange,
  onApprove,
  onReject,
  onRefresh,
  actionInProgressId,
}: WithdrawalRequestsTableProps): React.ReactElement {
  // Modal state
  const [modalRequest, setModalRequest] = useState<WithdrawalRequest | null>(null);
  const [modalAction, setModalAction] = useState<ModalActionType>(null);
  const [isProcessingAction, setIsProcessingAction] = useState<boolean>(false);
  const [detailsModalRequest, setDetailsModalRequest] = useState<WithdrawalRequest | null>(null);

  // Currency formatter
  const formatCurrency = (amount: number): string => `${amount.toLocaleString()} EGP`;

  // Date formatter helper
  const formatDate = (dateString: string): { formatted: string; relative: string } => {
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return { formatted: dateString, relative: "" };

      const formatted = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const diffHours = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60));
      let relative = "Recently";
      if (diffHours < 1) relative = "Just now";
      else if (diffHours < 24) relative = `${diffHours}h ago`;
      else {
        const diffDays = Math.floor(diffHours / 24);
        relative = diffDays === 1 ? "Yesterday" : `${diffDays}d ago`;
      }

      return { formatted, relative };
    } catch {
      return { formatted: dateString, relative: "" };
    }
  };

  const handleOpenModal = (request: WithdrawalRequest, action: "approve" | "reject") => {
    setModalRequest(request);
    setModalAction(action);
  };

  const handleCloseModal = () => {
    setModalRequest(null);
    setModalAction(null);
    setIsProcessingAction(false);
  };

  const handleConfirmApprove = async (requestId: string) => {
    setIsProcessingAction(true);
    const success = await onApprove(requestId);
    if (success) {
      handleCloseModal();
    } else {
      setIsProcessingAction(false);
    }
  };

  const handleConfirmReject = async (requestId: string, reason: string) => {
    setIsProcessingAction(true);
    const success = await onReject(requestId, reason);
    if (success) {
      handleCloseModal();
    } else {
      setIsProcessingAction(false);
    }
  };

  // Status Badge Helper
  const renderStatusBadge = (status: WithdrawalStatus) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 ring-2 ring-amber-400/20 animate-pulse">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Pending Review
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Rejected
          </span>
        );
    }
  };

  // Payment Method Badge Helper
  const renderPaymentMethod = (method: PaymentMethod, accountDetails: WithdrawalRequest["accountDetails"]) => {
    let Icon = CreditCard;
    let badgeClass = "bg-gray-50 text-gray-700 border-gray-200";

    if (method === "Bank Transfer") {
      Icon = Landmark;
      badgeClass = "bg-blue-50 text-blue-700 border-blue-200";
    } else if (method === "InstaPay") {
      Icon = Smartphone;
      badgeClass = "bg-purple-50 text-purple-700 border-purple-200";
    } else if (method === "Vodafone Cash" || method === "Orange Money") {
      Icon = Smartphone;
      badgeClass = "bg-rose-50 text-rose-700 border-rose-200";
    } else if (method === "Fawry") {
      Icon = Building;
      badgeClass = "bg-amber-50 text-amber-700 border-amber-200";
    }

    return (
      <div className="flex flex-col text-xs">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-medium border w-fit ${badgeClass}`}
        >
          <Icon className="w-3 h-3 shrink-0" />
          {method}
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="text-[11px] text-gray-400 truncate max-w-[170px]"
            title={
              accountDetails.bankName ||
              accountDetails.instantHandle ||
              accountDetails.walletNumber ||
              "Direct Account"
            }
          >
            {accountDetails.bankName ||
              accountDetails.instantHandle ||
              accountDetails.walletNumber ||
              "Direct Account"}
          </span>
          {accountDetails.status === "pending_verification" && (
            <span
              title="Bank Account: Pending Verification"
              className="px-1 py-0.2 text-[9px] font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded shrink-0"
            >
              Unverified
            </span>
          )}
        </div>
      </div>
    );
  };

  // Status Tab options
  const statusTabs: { id: "all" | WithdrawalStatus; label: string; count: number }[] = [
    { id: "all", label: "All Requests", count: counts.all },
    { id: "pending", label: "Pending", count: counts.pending },
    { id: "approved", label: "Approved", count: counts.approved },
    { id: "rejected", label: "Rejected", count: counts.rejected },
  ];

  const currentStatusTab = filters.status ?? "all";
  const pageStart = pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const pageEnd = Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <section
      aria-label="Seller Withdrawal Requests"
      className="bg-white border border-gray-200/80 rounded-2xl shadow-2xs overflow-hidden"
    >
      {/* Header and Filter Controls */}
      <div className="p-5 sm:p-6 border-b border-gray-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">
                Seller Withdrawal Requests
              </h2>
              {counts.pending > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                  {counts.pending} Action Required
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Review, verify bank information, and authorize payout disbursements to marketplace merchants.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRefresh}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              title="Refresh requests"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Refresh
            </button>
          </div>
        </div>

        {/* Filter Bar: Status Tabs & Search & Dropdowns */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
          {/* Status Tabs */}
          <div
            className="flex items-center gap-1 border-b sm:border-b-0 border-gray-200 overflow-x-auto pb-1 sm:pb-0"
            role="tablist"
          >
            {statusTabs.map((tab) => {
              const isActive = currentStatusTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onFilterChange({ status: tab.id, page: 1 })}
                  className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-gray-900 text-white shadow-xs"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-200/80 text-gray-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search and Secondary Filter Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input (Seller / Store) */}
            <div className="relative min-w-[220px] sm:min-w-[260px] flex-1 sm:flex-initial">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={filters.searchQuery || ""}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value, page: 1 })}
                placeholder="Search seller, store, or ID..."
                aria-label="Search withdrawal requests"
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Payment Method Filter */}
            <select
              value={filters.paymentMethod || "all"}
              onChange={(e) =>
                onFilterChange({
                  paymentMethod: e.target.value as "all" | PaymentMethod,
                  page: 1,
                })
              }
              aria-label="Filter by payment method"
              className="text-xs py-1.5 px-3 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">All Payment Methods</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="InstaPay">InstaPay</option>
              <option value="Vodafone Cash">Vodafone Cash</option>
              <option value="Fawry">Fawry</option>
            </select>

            {/* Date Range Filter */}
            <select
              value={filters.dateRange || "all"}
              onChange={(e) =>
                onFilterChange({
                  dateRange: e.target.value as "all" | "7d" | "30d" | "90d",
                  page: 1,
                })
              }
              aria-label="Filter by date range"
              className="text-xs py-1.5 px-3 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">Date: All Time</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-xs text-gray-400">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-2" />
            <span>Loading withdrawal requests...</span>
          </div>
        ) : error ? (
          <div className="py-16 px-6 text-center">
            <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-800">
              Failed to load withdrawal requests
            </p>
            <p className="text-xs text-gray-500 mt-1">{error}</p>
            <button
              type="button"
              onClick={onRefresh}
              className="mt-3 px-3 py-1.5 text-xs font-medium text-blue-600 hover:underline"
            >
              Try Again
            </button>
          </div>
        ) : requests.length === 0 ? (
          /* Exact required empty state string: "No withdrawal requests" */
          <div className="py-20 px-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">
              No withdrawal requests
            </h3>
            <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
              There are currently no withdrawal requests matching your selected filters.
            </p>
            {(filters.searchQuery || filters.status !== "all" || filters.paymentMethod !== "all") && (
              <button
                type="button"
                onClick={() =>
                  onFilterChange({
                    searchQuery: "",
                    status: "all",
                    paymentMethod: "all",
                    dateRange: "all",
                    page: 1,
                  })
                }
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        ) : (
          <table className="w-full min-w-[940px] text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-3 px-5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Seller
                </th>
                <th className="py-3 px-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Store Name
                </th>
                <th className="py-3 px-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Requested Amount
                </th>
                <th className="py-3 px-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Request Date
                </th>
                <th className="py-3 px-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Payment Method
                </th>
                <th className="py-3 px-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  Status
                </th>
                <th className="py-3 pr-5 pl-4 text-[11px] font-semibold uppercase tracking-wider text-gray-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-xs">
              {requests.map((request) => {
                const { formatted, relative } = formatDate(request.requestDate);
                const isPending = request.status === "pending";
                const isProcessing = actionInProgressId === request.id;

                return (
                  <tr
                    key={request.id}
                    className={`transition-colors ${
                      isPending
                        ? "bg-amber-50/20 hover:bg-amber-50/40"
                        : "hover:bg-gray-50/60"
                    }`}
                  >
                    {/* Seller Column */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-900 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs">
                          {request.sellerName.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {request.sellerName}
                          </p>
                          <p className="text-[11px] text-gray-400 truncate">
                            {request.sellerEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Store Name Column */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-gray-800 truncate max-w-[170px]">
                        {request.storeName}
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono">
                        {request.id}
                      </div>
                    </td>

                    {/* Requested Amount Column */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-mono text-sm font-bold text-gray-900">
                        {formatCurrency(request.requestedAmount)}
                      </span>
                    </td>

                    {/* Request Date Column */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-medium text-gray-700">{formatted}</div>
                      {relative && (
                        <div className="text-[11px] text-gray-400">{relative}</div>
                      )}
                    </td>

                    {/* Payment Method Column */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {renderPaymentMethod(request.paymentMethod, request.accountDetails)}
                    </td>

                    {/* Status Column */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {renderStatusBadge(request.status)}
                    </td>

                    {/* Actions Column */}
                    <td className="py-3.5 pr-5 pl-4 text-right whitespace-nowrap">
                      {isPending ? (
                        <div className="inline-flex items-center gap-1.5">
                          {/* Approve Action */}
                          <button
                            type="button"
                            onClick={() => handleOpenModal(request, "approve")}
                            disabled={isProcessing}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-2xs disabled:opacity-50 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1"
                            aria-label={`Approve request ${request.id}`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Approve
                          </button>

                          {/* Reject Action */}
                          <button
                            type="button"
                            onClick={() => handleOpenModal(request, "reject")}
                            disabled={isProcessing}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 active:bg-rose-100 disabled:opacity-50 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1"
                            aria-label={`Reject request ${request.id}`}
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDetailsModalRequest(request)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                          title="View audit record"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Details
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50/40 text-xs">
        <p className="text-gray-500">
          Showing <span className="font-semibold text-gray-800">{pageStart}</span> to{" "}
          <span className="font-semibold text-gray-800">{pageEnd}</span> of{" "}
          <span className="font-semibold text-gray-800">{pagination.total}</span> requests
        </p>

        <div className="flex items-center gap-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onFilterChange({ page: Math.max(1, pagination.page - 1) })}
            disabled={pagination.page <= 1 || isLoading}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-white hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-gray-200"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => onFilterChange({ page: pageNum })}
              disabled={isLoading}
              className={`min-w-8 h-8 px-2 rounded-lg text-xs font-semibold transition-colors ${
                pagination.page === pageNum
                  ? "bg-gray-900 text-white shadow-xs"
                  : "text-gray-600 hover:bg-white hover:border hover:border-gray-200"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            onClick={() =>
              onFilterChange({
                page: Math.min(pagination.totalPages, pagination.page + 1),
              })
            }
            disabled={pagination.page >= pagination.totalPages || isLoading}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-white hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border border-transparent hover:border-gray-200"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Confirmation Dialog Modal */}
      <WithdrawalActionModal
        request={modalRequest}
        actionType={modalAction}
        isOpen={Boolean(modalRequest && modalAction)}
        isProcessing={isProcessingAction}
        onClose={handleCloseModal}
        onConfirmApprove={handleConfirmApprove}
        onConfirmReject={handleConfirmReject}
      />

      {/* Details / Audit View Modal for settled requests */}
      {detailsModalRequest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-bold text-gray-900 text-base">
                Withdrawal Audit Record
              </h3>
              <button
                type="button"
                onClick={() => setDetailsModalRequest(null)}
                className="text-gray-400 hover:text-gray-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Request ID:</span>
                <span className="font-mono font-semibold">{detailsModalRequest.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Merchant Store:</span>
                <span className="font-semibold">{detailsModalRequest.storeName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Seller:</span>
                <span className="text-gray-700">
                  {detailsModalRequest.sellerName} ({detailsModalRequest.sellerEmail})
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Requested Amount:</span>
                <span className="font-mono font-bold text-gray-900">
                  {formatCurrency(detailsModalRequest.requestedAmount)}
                </span>
              </div>
              {detailsModalRequest.balance !== undefined && (
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Wallet Balance:</span>
                  <span className="font-mono font-medium text-gray-700">
                    {formatCurrency(detailsModalRequest.balance)}
                  </span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Payment Destination:</span>
                <span className="font-medium text-gray-800">
                  {detailsModalRequest.accountDetails.bankName || detailsModalRequest.paymentMethod}
                </span>
              </div>
              {detailsModalRequest.accountDetails.accountHolderName && (
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Account Holder:</span>
                  <span className="text-gray-700">
                    {detailsModalRequest.accountDetails.accountHolderName}
                  </span>
                </div>
              )}
              {detailsModalRequest.accountDetails.status && (
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Bank Verification:</span>
                  <span
                    className={`font-semibold capitalize ${
                      detailsModalRequest.accountDetails.status === "verified"
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    {detailsModalRequest.accountDetails.status.replace(/_/g, " ")}
                  </span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Current Status:</span>
                <span>{renderStatusBadge(detailsModalRequest.status)}</span>
              </div>
              {detailsModalRequest.reviewedAt && (
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Processed On:</span>
                  <span className="text-gray-700">
                    {formatDate(detailsModalRequest.reviewedAt).formatted} by{" "}
                    {detailsModalRequest.reviewedBy}
                  </span>
                </div>
              )}
              {detailsModalRequest.rejectionReason && (
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg text-rose-800">
                  <span className="font-semibold block mb-1">Rejection Reason:</span>
                  {detailsModalRequest.rejectionReason}
                </div>
              )}
              {detailsModalRequest.notes && (
                <div className="p-3 bg-gray-50 rounded-lg text-gray-600">
                  <span className="font-semibold block mb-1">Merchant Notes:</span>
                  {detailsModalRequest.notes}
                </div>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={() => setDetailsModalRequest(null)}
                className="px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-800"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default WithdrawalRequestsTable;
