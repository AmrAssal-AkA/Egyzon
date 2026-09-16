export type SellerStatus =
  | "active"
  | "pending"
  | "suspended"
  | "banned"
  | "under_review";

export interface ApiSellerDocuments {
  commercialRegisterUrl?: string;
  taxCardUrl?: string;
}

export type BankAccountVerificationStatus = "pending" | "verified" | "rejected";
export type BankAccountDecision = "verified" | "rejected";

export interface SellerBankAccount {
  bankName?: string;
  accountHolderName?: string;
  accountNumber?: string;
  iban?: string;
  swiftCode?: string;
  routingNumber?: string;
  status?: BankAccountVerificationStatus | string;
  verificationStatus?: BankAccountVerificationStatus | string;
  isVerified?: boolean;
  documentUrl?: string;
  statementUrl?: string;
}

export interface Seller {
  id: string;
  storeName: string;
  businessId: string;
  ownerName: string;
  ownerEmail: string;
  submittedAt: string;
  submittedRelative: string;
  riskScore: number;
  status: SellerStatus;
  commercialRegisterNumber?: string;
  taxCardNumber?: string;
  sellerDocuments?: ApiSellerDocuments;
  commercialRegisterImage?: string;
  taxCardImage?: string;
  storeManagement?: ApiStoreManagement;
  notes?: string;
  bankAccount?: SellerBankAccount;
  phoneNumber?: string;
  role?: string;
  isBlocked?: boolean;
  isVerified?: boolean;
  createdAt?: string;
}

export interface ApiSellerApplicationUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ApiSellerApplication {
  _id: string;
  firstName?: string;
  lastName?: string;
  FirstName?: string;
  LastName?: string;
  email: string;
  role?: string;
  phoneNumber?: string;
  isBlocked?: boolean;
  isVerified?: boolean;
  storeName: string;
  commercialRegisterNumber: string;
  taxCardNumber: string;
  sellerDocuments?: ApiSellerDocuments;
  commercialRegisterImage?: string;
  taxCardImage?: string;
  applicantStatus: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: ApiSellerApplicationUser;
  bankAccount?: SellerBankAccount;
}

export interface ApiStoreManagement {
  storeLogo?: string;
  storeBanner?: string;
  storeDescription?: string;
  storeType?: "physical" | "online" | "both";
  storephysicalAddress?: string;
  storeOnlineAddress?: string;
}

export interface ApiSeller {
  _id: string;
  commercialRegisterNumber: string;
  taxCardNumber: string;
  sellerDocuments?: ApiSellerDocuments;
  commercialRegisterImage?: string;
  taxCardImage?: string;
  storeName: string;
  applicantStatus: string;
  notes?: string;
  storeManagement?: ApiStoreManagement;
  FirstName?: string;
  LastName?: string;
  email?: string;
  isBlocked?: boolean;
  bankAccount?: SellerBankAccount;
  createdAt: string;
  updatedAt: string;
}

export interface SellersPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiAllSellersData {
  sellers: ApiSeller[];
  pagination: SellersPagination;
}

export interface GetPendingSellerApplicationsParams {
  page?: number;
  limit?: number;
}

export interface ApiPendingSellerApplicationsData {
  applications: ApiSellerApplication[];
  pagination?: SellersPagination;
  total?: number;
  totalPages?: number;
}

export interface PendingSellerApplicationsResult {
  sellers: Seller[];
  applications: Seller[];
  pagination: SellersPagination;
}

export type SellerFilterId = 1 | 2 | 3 | 4 | 5;

export const SELLER_FILTER_STATUS: Record<SellerFilterId, SellerStatus> = {
  1: "active",
  2: "pending",
  3: "suspended",
  4: "banned",
  5: "under_review",
};
