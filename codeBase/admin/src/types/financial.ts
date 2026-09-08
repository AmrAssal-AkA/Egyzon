export type WithdrawalStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "completed"
  | "failed";

export type PaymentMethod =
  | "Bank Transfer"
  | "InstaPay"
  | "Vodafone Cash"
  | "Fawry"
  | "Orange Money";

export interface WithdrawalAccountDetails {
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  iban?: string;
  swiftCode?: string;
  walletNumber?: string;
  instantHandle?: string;
  issuer?: string;
  fullName?: string;
  last4?: string;
  BankCode?: string;
  status?: string;
}

export interface WithdrawalRequest {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  sellerAvatar?: string;
  storeName: string;
  requestedAmount: number;
  currency: string;
  requestDate: string;
  paymentMethod: PaymentMethod;
  accountDetails: WithdrawalAccountDetails;
  status: WithdrawalStatus;
  notes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  balance?: number;
}

export interface ApiSellerBankAccount {
  issuer?: string;
  fullName?: string;
  last4?: string;
  BankCode?: string;
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  iban?: string;
  swiftCode?: string;
  walletNumber?: string;
  instantHandle?: string;
  status?: string;
}

export interface ApiSellerInWallet {
  _id?: string;
  FirstName?: string;
  LastName?: string;
  email?: string;
  storeName?: string;
  bankAccount?: ApiSellerBankAccount;
}

export interface ApiTransactionHistoryItem {
  _id?: string;
  id?: string;
  type?: string;
  amount?: number;
  currency?: string;
  status?: string;
  createdAt?: string;
  date?: string;
  description?: string;
  notes?: string;
  paymentMethod?: string;
}

export interface ApiSellerWalletWithdrawal {
  _id: string;
  seller?: ApiSellerInWallet;
  balance?: number;
  currency?: string;
  amount?: number;
  requestedAmount?: number;
  transactionHistory?: ApiTransactionHistoryItem[] | ApiTransactionHistoryItem;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  notes?: string;
}

export interface ApiGetAllSellerWithdrawalsData {
  withdrawalRequests?: ApiSellerWalletWithdrawal[];
  pagination?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  total?: number;
  totalPages?: number;
  totalCount?: number;
}

export interface MonthlySalesDataPoint {
  month: string;
  shortMonth: string;
  fullDate: string;
  sales: number;
  platformFees: number;
  ordersCount: number;
  growthRate: number;
}

export interface DailySalesDataPoint {
  label: string;
  date: string;
  revenue: number;
  orders: number;
}

export interface SalesOverviewLast30DaysData {
  timeframe: string;
  totalRevenue: number;
  totalOrders: number;
  AverageOrderValue: number;
  revenueChangePercent: number;
  series: DailySalesDataPoint[];
  peak?: {
    label: string;
    date: string;
    revenue: number;
  };
}

export interface TotalSalesData {
  totalSales: number;
}

export interface WithdrawalCompletedCountData {
  completedCount: number;
}

export interface PlatformFeeData {
  feePercentage: number;
  totalPlatformFees: number;
  totalMarketplaceSales: number;
  lastUpdated: string;
  description: string;
}

export interface FinancialSummaryMetrics {
  totalSales: {
    value: number;
    currency: string;
    changePercentage: number;
    trend: "up" | "down";
    periodLabel: string;
  };
  totalPlatformFees: {
    value: number;
    currency: string;
    changePercentage: number;
    trend: "up" | "down";
    feeRate: number;
  };
  pendingWithdrawals: {
    totalAmount: number;
    currency: string;
    count: number;
    changePercentage?: number;
  };
  completedWithdrawals: {
    totalAmount: number;
    currency: string;
    count: number;
    changePercentage?: number;
    trend?: "up" | "down";
  };
}

export interface WithdrawalFilters {
  searchQuery?: string;
  status?: "all" | WithdrawalStatus;
  paymentMethod?: "all" | PaymentMethod;
  dateRange?: "all" | "7d" | "30d" | "90d" | "year";
  page?: number;
  limit?: number;
}

export interface PaginatedWithdrawalsResponse {
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
}
