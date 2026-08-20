export type TransactionType = "sale" | "fee" | "payout" | "refund";
export type TransactionStatus = "completed" | "pending" | "failed";

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  amount: number;
  currency: string;
  status: TransactionStatus;
}

export interface TransactionQueryState {
  page: number;
  limit: number;
  status: TransactionStatus | "all";
  type: TransactionType | "all";
  sortBy: "date" | "id" | "amount";
  sortOrder: "asc" | "desc";
  searchTerm: string;
}

export interface TransactionTableProps {
  // Controlled mode props
  transactions?: Transaction[];
  isLoading?: boolean;
  totalCount?: number;
  queryState?: Partial<TransactionQueryState>;
  onQueryChange?: (newQuery: Partial<TransactionQueryState>) => void;
  onExport?: () => void;
  showViewAllLink?: boolean;
}

export interface BalanceWalletProps {
  balance: number;
  pendingBalance?: number;
  lastPayoutAmount?: number;
  lastPayoutDate?: string;
  onWithdrawSubmit?: (amount: number, method: string, details: Record<string, string>) => Promise<boolean>;
  onGenerateStatementSubmit?: (range: string, format: string, customDates?: { start: string; end: string }) => Promise<boolean>;
}
