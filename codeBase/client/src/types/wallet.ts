export type TransactionType =
  | "sale"
  | "fee"
  | "payout"
  | "refund"
  | "withdrawal"
  | (string & {});
export type TransactionStatus =
  | "completed"
  | "pending"
  | "failed"
  | (string & {});

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
  balance?: number;
  pendingBalance?: number;
  lastPayoutAmount?: number;
  lastPayoutDate?: string;
  onWithdrawSubmit?: (amount: number, method: string, details: Record<string, string>) => Promise<boolean>;
  onGenerateStatementSubmit?: (range: string, format: string, customDates?: { start: string; end: string }) => Promise<boolean>;
}

export type CardBrand = "visa" | "mastercard" | "amex" | "meeza" | "other";

export interface SellerCreditCard {
  id: string;
  cardHolder: string;
  cardNumberLast4: string;
  brand: CardBrand;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
  colorVariant?: "blue" | "dark" | "emerald" | "purple";
  createdAt?: string;
  bankCode?: string;
  status?: "verified" | "pending_verification" | "rejected" | string;
  issuer?: string;
}

export interface AddCreditCardDto {
  cardHolder: string;
  cardNumber: string;
  expiryDate: string; // MM/YY
  cvv: string;
  isDefault?: boolean;
}

export interface SellerCreditCardsProps {
  initialCards?: SellerCreditCard[];
  onAddCard?: (card: AddCreditCardDto) => Promise<boolean> | boolean;
  onDeleteCard?: (cardId: string) => Promise<boolean> | boolean;
  onSetDefaultCard?: (cardId: string) => Promise<boolean> | boolean;
  className?: string;
}

