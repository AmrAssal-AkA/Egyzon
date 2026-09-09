import { AxiosError } from "axios";
import { serverClient } from "../lib/serverClient";
import type { ApiResponse } from "../types/auth";
import type {
  ApiGetAllSellerWithdrawalsData,
  ApiSellerBankAccount,
  ApiSellerWalletWithdrawal,
  ApiTransactionHistoryItem,
  FinancialSummaryMetrics,
  PaginatedWithdrawalsResponse,
  PaymentMethod,
  PlatformFeeData,
  SalesOverviewLast30DaysData,
  TotalSalesData,
  WithdrawalAccountDetails,
  WithdrawalCompletedCountData,
  WithdrawalFilters,
  WithdrawalRequest,
  WithdrawalStatus,
} from "../types/financial";



/**
 * Fetch marketplace-wide financial summary metrics
 */
export async function getFinancialSummary(): Promise<ApiResponse<FinancialSummaryMetrics>> {
  try {
    const { data } = await serverClient.get<ApiResponse<FinancialSummaryMetrics>>(
      "/financial/summary"
    );
    if (data.success && data.data) {
      return data;
    }
  } catch {
    // Graceful fallback to current mock summary when backend endpoint is not yet deployed
  }

 
  let totalSalesValue = 0;
  try {
    const salesRes = await getTotalSales();
    if (salesRes.success && salesRes.data && typeof salesRes.data.totalSales === "number") {
      totalSalesValue = salesRes.data.totalSales;
    }
  } catch {
    // Keep default 0 on failure
  }
  const totalPlatformFeesValue = Math.round((totalSalesValue * 5) / 100);

  const pendingWithdrawals = WithdrawalRequests.filter((w) => w.status === "pending");
  const approvedWithdrawals = WithdrawalRequests.filter((w) => w.status === "approved");

  const pendingAmount = pendingWithdrawals.reduce((sum, w) => sum + w.requestedAmount, 0);
  const completedAmount = approvedWithdrawals.reduce((sum, w) => sum + w.requestedAmount, 0);

  let completedCountValue = approvedWithdrawals.length;
  try {
    const countRes = await getWithdrawalCompletedCount();
    if (countRes.success && countRes.data && typeof countRes.data.completedCount === "number") {
      completedCountValue = countRes.data.completedCount;
    }
  } catch {
    // Keep fallback
  }

  const summary: FinancialSummaryMetrics = {
    totalSales: {
      value: totalSalesValue,
      currency: "EGP",
      changePercentage: 16.4,
      trend: "up",
      periodLabel: "Last 12 Months",
    },
    totalPlatformFees: {
      value: totalPlatformFeesValue,
      currency: "EGP",
      changePercentage: 16.4,
      trend: "up",
      feeRate: 5,
    },
    pendingWithdrawals: {
      totalAmount: pendingAmount,
      currency: "EGP",
      count: pendingWithdrawals.length,
      changePercentage: 5,
    },
    completedWithdrawals: {
      totalAmount: completedAmount,
      currency: "EGP",
      count: completedCountValue,
      changePercentage: 24.8,
      trend: "up",
    },
  };

  return {
    success: true,
    message: "Financial summary loaded",
    data: summary,
  };
}

/**
 * Fetch 30-day marketplace sales overview via GET /api/admin/get-salesOverview-last30days
 */
export async function getSalesOverviewLast30Days(): Promise<ApiResponse<SalesOverviewLast30DaysData>> {
  try {
    const { data } = await serverClient.get<ApiResponse<SalesOverviewLast30DaysData>>(
      "/get-salesOverview-last30days"
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message:
          error.response?.data?.message ??
          error.response?.data?.error ??
          "Failed to retrieve 30-day sales overview",
      };
    }

    return {
      success: false,
      message: "Failed to retrieve 30-day sales overview",
    };
  }
}

/**
 * Fetch marketplace sales overview for charting (aliases 30-day analytics)
 */
export const getSalesOverview = getSalesOverviewLast30Days;

/**
 * Fetch platform fee rate & total generated marketplace fees
 */
export async function getPlatformFeeData(): Promise<ApiResponse<PlatformFeeData>> {
  try {
    const { data } = await serverClient.get<ApiResponse<PlatformFeeData>>(
      "/getPlatformFee"
    );
    if (data.success && data.data) {
      return data;
    }
  } catch {
    // Fallback
  }

  const feeRate = 5; 

  return {
    success: true,
    message: "Platform fee loaded",
    data: {
      feePercentage: feeRate,
      totalPlatformFees: 0,
      totalMarketplaceSales: 0,
      lastUpdated: new Date().toISOString(),
      description:
        "Egyzon retains this percentage from all completed marketplace customer transactions across all stores.",
    },
  };
}

/**
 * Fetch total sales across the platform via GET /api/admin/getTotalSales
 */
export async function getTotalSales(): Promise<ApiResponse<TotalSalesData>> {
  try {
    const { data } = await serverClient.get<ApiResponse<TotalSalesData>>(
      "/getTotalSales"
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message:
          error.response?.data?.message ??
          error.response?.data?.error ??
          "Failed to retrieve total sales",
      };
    }

    return {
      success: false,
      message: "Failed to retrieve total sales",
    };
  }
}

/**
 * Fetch count of completed seller withdrawals via GET /api/admin/getWithdrawalCompletedCount
 */
export async function getWithdrawalCompletedCount(): Promise<ApiResponse<WithdrawalCompletedCountData>> {
  try {
    const { data } = await serverClient.get<ApiResponse<WithdrawalCompletedCountData>>(
      "/getWithdrawalCompletedCount"
    );
    if (data.success && data.data) {
      return data;
    }
  } catch {
    // Graceful fallback for offline development/testing
  }

  return {
    success: true,
    message: "Completed withdrawals count loaded",
    data: {
      completedCount: 0,
    },
  };
}

function mapPaymentMethod(
  bankAccount?: ApiSellerBankAccount,
  methodName?: string
): PaymentMethod {
  if (methodName) return methodName as PaymentMethod;

  return "Bank Transfer";
}

function mapAccountDetails(
  bankAccount?: ApiSellerBankAccount,
  fallbackDetails?: WithdrawalAccountDetails
): WithdrawalAccountDetails {
  if (fallbackDetails) return fallbackDetails;

  const bankCode = bankAccount?.BankCode || bankAccount?.bankName || "";
  const last4 = bankAccount?.last4;
  const bankName = bankCode
    ? `${bankCode}${last4 ? ` (•••• ${last4})` : ""}`
    : bankAccount?.bankName || "Bank Account";

  return {
    bankName,
    accountHolderName: bankAccount?.fullName || bankAccount?.accountHolderName,
    accountNumber: bankAccount?.accountNumber || (last4 ? `•••• ${last4}` : undefined),
    iban: bankAccount?.iban,
    swiftCode: bankAccount?.swiftCode,
    walletNumber: bankAccount?.walletNumber,
    instantHandle: bankAccount?.instantHandle,
    issuer: bankAccount?.issuer,
    fullName: bankAccount?.fullName,
    last4: bankAccount?.last4,
    BankCode: bankAccount?.BankCode,
    status: bankAccount?.status,
  };
}

export function mapApiWithdrawalToWithdrawalRequest(
  item: ApiSellerWalletWithdrawal
): WithdrawalRequest {
  const seller = item.seller;
  const sellerName =
    `${seller?.FirstName ?? ""} ${seller?.LastName ?? ""}`.trim() ||
    seller?.storeName ||
    "Unknown Seller";
  const sellerEmail = seller?.email ?? "—";
  const storeName = seller?.storeName ?? "—";
  const sellerId = seller?._id ?? "";
  const currency = item.currency ?? "EGP";

  // Support both unwound transaction object (from MongoDB $unwind) and transaction array
  const rawTx = item.transactionHistory;
  const targetTx: ApiTransactionHistoryItem | undefined =
    rawTx && !Array.isArray(rawTx) && typeof rawTx === "object"
      ? (rawTx as ApiTransactionHistoryItem)
      : Array.isArray(rawTx)
      ? rawTx.find(
          (tx) =>
            tx &&
            (tx.type?.toLowerCase?.().includes("withdraw") ||
              tx.status?.toLowerCase?.() === "pending" ||
              tx.status?.toLowerCase?.() === "completed" ||
              tx.status?.toLowerCase?.() === "approved" ||
              tx.status?.toLowerCase?.() === "rejected" ||
              tx.status?.toLowerCase?.() === "failed")
        ) || rawTx[0]
      : undefined;

  const requestedAmount =
    targetTx?.amount ??
    item.requestedAmount ??
    item.amount ??
    item.balance ??
    0;

  const id = targetTx?._id ?? targetTx?.id ?? item._id;

  const requestDate =
    targetTx?.date ??
    targetTx?.createdAt ??
    item.createdAt ??
    item.updatedAt ??
    new Date().toISOString();

  const paymentMethod = mapPaymentMethod(
    seller?.bankAccount,
    targetTx?.paymentMethod || (item as any).paymentMethod
  );
  const accountDetails = mapAccountDetails(seller?.bankAccount);

  const rawStatus = (
    targetTx?.status ||
    item.status ||
    "pending"
  ).toLowerCase();

  let status: WithdrawalStatus = "pending";
  if (rawStatus === "approved" || rawStatus === "completed") {
    status = "approved";
  } else if (rawStatus === "rejected" || rawStatus === "failed") {
    status = "rejected";
  } else if (rawStatus === "pending") {
    status = "pending";
  } else {
    status = rawStatus as WithdrawalStatus;
  }

  return {
    id,
    sellerId,
    sellerName,
    sellerEmail,
    storeName,
    requestedAmount,
    currency,
    requestDate,
    paymentMethod,
    accountDetails,
    status,
    notes: targetTx?.notes || targetTx?.description || item.notes,
    balance: item.balance,
  };
}

export function mapApiWithdrawalWalletToRequests(
  item: ApiSellerWalletWithdrawal
): WithdrawalRequest[] {
  if (Array.isArray(item.transactionHistory) && item.transactionHistory.length > 0) {
    const withdrawalTransactions = item.transactionHistory.filter(
      (tx) =>
        tx &&
        (tx.type?.toLowerCase?.().includes("withdraw") ||
          tx.status?.toLowerCase?.() === "pending" ||
          tx.status?.toLowerCase?.() === "completed" ||
          tx.status?.toLowerCase?.() === "rejected" ||
          tx.status?.toLowerCase?.() === "failed" ||
          tx.status?.toLowerCase?.() === "approved")
    );

    if (withdrawalTransactions.length > 0) {
      return withdrawalTransactions.map((tx) =>
        mapApiWithdrawalToWithdrawalRequest({
          ...item,
          transactionHistory: tx,
        })
      );
    }
  }

  return [mapApiWithdrawalToWithdrawalRequest(item)];
}

const WithdrawalRequests: WithdrawalRequest[] = [];


export async function getWithdrawalRequests(
  filters: WithdrawalFilters = {}
): Promise<ApiResponse<PaginatedWithdrawalsResponse>> {
  const {
    searchQuery = "",
    status = "all",
    paymentMethod = "all",
    page = 1,
    limit = 10,
  } = filters;

  const pageNum = Number(page) || 1;
  const limitNum = Math.min(Math.max(1, Number(limit) || 10), 100);

  const apiStatus =
    status === "approved"
      ? "completed"
      : status || "all";

  try {
    const { data } = await serverClient.get<ApiResponse<ApiGetAllSellerWithdrawalsData>>(
      "/getAllSellerWithdrawlRequests",
      {
        params: {
          page: pageNum,
          limit: limitNum,
          status: apiStatus,
        },
      }
    );

    if (data.success && data.data) {
      const rawList: ApiSellerWalletWithdrawal[] = Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.data?.withdrawalRequests)
        ? data.data.withdrawalRequests
        : Array.isArray((data.data as any)?.requests)
        ? (data.data as any).requests
        : Array.isArray((data as any)?.withdrawalRequests)
        ? (data as any).withdrawalRequests
        : [];

      const mappedRequests = rawList.flatMap(mapApiWithdrawalWalletToRequests);

      let filtered = mappedRequests;
      if (status !== "all") {
        filtered = filtered.filter(
          (item) =>
            item.status === status ||
            (status === "approved" && ((item.status as string) === "completed" || item.status === "approved")) ||
            (status === "rejected" && ((item.status as string) === "failed" || item.status === "rejected"))
        );
      }

      // Payment method filter
      if (paymentMethod !== "all") {
        filtered = filtered.filter((item) => item.paymentMethod === paymentMethod);
      }

      // Search query filter
      const query = searchQuery.trim().toLowerCase();
      if (query) {
        filtered = filtered.filter((item) => {
          const matchName = item.sellerName.toLowerCase().includes(query);
          const matchEmail = item.sellerEmail.toLowerCase().includes(query);
          const matchStore = item.storeName.toLowerCase().includes(query);
          const matchId = item.id.toLowerCase().includes(query);
          return matchName || matchEmail || matchStore || matchId;
        });
      }

      const total =
        data.data.pagination?.total ??
        data.data.total ??
        data.data.totalCount ??
        mappedRequests.length;

      const isClientFiltered = query !== "" || paymentMethod !== "all";
      const paginationTotal = isClientFiltered ? filtered.length : total;

      const totalPages =
        data.data.pagination?.totalPages ??
        data.data.totalPages ??
        Math.max(1, Math.ceil(paginationTotal / limitNum));

      const counts = {
        all: status === "all" ? total : mappedRequests.length,
        pending:
          status === "pending"
            ? total
            : mappedRequests.filter((w) => w.status === "pending").length,
        approved:
          status === "approved"
            ? total
            : mappedRequests.filter(
                (w) =>
                  w.status === "approved" ||
                  (w.status as string) === "completed"
              ).length,
        rejected:
          status === "rejected"
            ? total
            : mappedRequests.filter(
                (w) =>
                  w.status === "rejected" ||
                  (w.status as string) === "failed"
              ).length,
      };

      return {
        success: true,
        message: data.message || "All seller withdrawal requests retrieved successfully",
        data: {
          requests: filtered,
          pagination: {
            page: data.data.pagination?.page ?? pageNum,
            limit: data.data.pagination?.limit ?? limitNum,
            total: paginationTotal,
            totalPages,
          },
          counts,
        },
      };
    }
  } catch {
    // Fallback to local in-memory dataset
  }

  const query = searchQuery.trim().toLowerCase();

  const filtered = WithdrawalRequests.filter((item) => {
    // Status filter
    if (
      status !== "all" &&
      item.status !== status &&
      !(status === "approved" && ((item.status as string) === "completed" || item.status === "approved")) &&
      !(status === "rejected" && ((item.status as string) === "failed" || item.status === "rejected"))
    ) {
      return false;
    }

    // Payment method filter
    if (paymentMethod !== "all" && item.paymentMethod !== paymentMethod) {
      return false;
    }

    if (query) {
      const matchName = item.sellerName.toLowerCase().includes(query);
      const matchEmail = item.sellerEmail.toLowerCase().includes(query);
      const matchStore = item.storeName.toLowerCase().includes(query);
      const matchId = item.id.toLowerCase().includes(query);
      if (!matchName && !matchEmail && !matchStore && !matchId) {
        return false;
      }
    }

    return true;
  });


  const counts = {
    all: WithdrawalRequests.length,
    pending: WithdrawalRequests.filter((w) => w.status === "pending").length,
    approved: WithdrawalRequests.filter((w) => w.status === "approved" || (w.status as string) === "completed").length,
    rejected: WithdrawalRequests.filter((w) => w.status === "rejected" || (w.status as string) === "failed").length,
  };

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limitNum));
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedRequests = filtered.slice(startIndex, startIndex + limitNum);

  return {
    success: true,
    message: "Withdrawal requests loaded",
    data: {
      requests: paginatedRequests,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
      },
      counts,
    },
  };
}

export interface ApproveSellerWithdrawalPayload {
  decision: "approved" | "rejected";
  reason?: string;
  rejectionReason?: string;
}

export async function approveSellerWithdrawalRequest(
  sellerId: string,
  transactionId: string,
  decision: "approved" | "rejected",
  reason?: string
): Promise<ApiResponse<unknown>> {
  try {
    const payload: ApproveSellerWithdrawalPayload = {
      decision,
      ...(reason ? { reason, rejectionReason: reason } : {}),
    };

    const { data } = await serverClient.patch<ApiResponse<unknown>>(
      `/approveSellerWithdrawalRequest/${sellerId}/${transactionId}`,
      payload
    );

    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message:
          error.response?.data?.message ??
          error.response?.data?.error ??
          `Failed to ${decision} seller withdrawal request`,
      };
    }

    return {
      success: false,
      message: `Failed to ${decision} seller withdrawal request`,
    };
  }
}

/**
 * Approve a pending seller withdrawal request
 */
export async function approveWithdrawal(
  requestId: string,
  sellerId?: string
): Promise<ApiResponse<WithdrawalRequest>> {
  const targetSellerId =
    sellerId ||
    WithdrawalRequests.find((w) => w.id === requestId)?.sellerId ||
    requestId;

  try {
    const res = await approveSellerWithdrawalRequest(
      targetSellerId,
      requestId,
      "approved"
    );

    if (res.success) {
      const index = WithdrawalRequests.findIndex((w) => w.id === requestId);
      if (index !== -1) {
        WithdrawalRequests[index] = {
          ...WithdrawalRequests[index],
          status: "approved",
          reviewedAt: new Date().toISOString(),
          reviewedBy: "Admin Operations",
        };
      }

      return {
        success: true,
        message: res.message || `Withdrawal request ${requestId} has been approved successfully.`,
        data: index !== -1 ? WithdrawalRequests[index] : undefined,
      };
    }
  } catch {
    // Local mutation fallback
  }

  const index = WithdrawalRequests.findIndex((w) => w.id === requestId);
  if (index === -1) {
    return {
      success: false,
      message: `Withdrawal request ${requestId} not found.`,
    };
  }

  WithdrawalRequests[index] = {
    ...WithdrawalRequests[index],
    status: "approved",
    reviewedAt: new Date().toISOString(),
    reviewedBy: "Admin Operations",
  };

  return {
    success: true,
    message: `Withdrawal request ${requestId} has been approved successfully.`,
    data: WithdrawalRequests[index],
  };
}

/**
 * Reject a pending seller withdrawal request with reason
 */
export async function rejectWithdrawal(
  requestId: string,
  rejectionReason: string,
  sellerId?: string
): Promise<ApiResponse<WithdrawalRequest>> {
  const targetSellerId =
    sellerId ||
    WithdrawalRequests.find((w) => w.id === requestId)?.sellerId ||
    requestId;

  try {
    const res = await approveSellerWithdrawalRequest(
      targetSellerId,
      requestId,
      "rejected",
      rejectionReason
    );

    if (res.success) {
      const index = WithdrawalRequests.findIndex((w) => w.id === requestId);
      if (index !== -1) {
        WithdrawalRequests[index] = {
          ...WithdrawalRequests[index],
          status: "rejected",
          reviewedAt: new Date().toISOString(),
          reviewedBy: "Admin Compliance",
          rejectionReason: rejectionReason.trim() || "Declined by administrator.",
        };
      }

      return {
        success: true,
        message: res.message || `Withdrawal request ${requestId} has been rejected.`,
        data: index !== -1 ?WithdrawalRequests[index] : undefined,
      };
    }
  } catch {
    // Local mutation fallback
  }

  const index = WithdrawalRequests.findIndex((w) => w.id === requestId);
  if (index === -1) {
    return {
      success: false,
      message: `Withdrawal request ${requestId} not found.`,
    };
  }

  WithdrawalRequests[index] = {
    ...WithdrawalRequests[index],
    status: "rejected",
    reviewedAt: new Date().toISOString(),
    reviewedBy: "Admin Compliance",
    rejectionReason: rejectionReason.trim() || "Declined by administrator.",
  };

  return {
    success: true,
    message: `Withdrawal request ${requestId} has been rejected.`,
    data: WithdrawalRequests[index],
  };
}
