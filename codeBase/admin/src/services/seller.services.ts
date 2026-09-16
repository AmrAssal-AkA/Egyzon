import { AxiosError } from "axios";

import { serverClient } from "../lib/serverClient";
import type { ApiResponse } from "../types/auth";
import type {
  ApiAllSellersData,
  ApiPendingSellerApplicationsData,
  ApiSeller,
  ApiSellerApplication,
  BankAccountDecision,
  GetPendingSellerApplicationsParams,
  PendingSellerApplicationsResult,
  Seller,
  SellerStatus,
  SellersPagination,
} from "../types/seller";

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? error.response?.data?.error ?? fallback;
  }

  return fallback;
}

function toSellerStatus(status: string): SellerStatus {
  const normalized = status.toLowerCase().replace(/[\s-]+/g, "_");

  if (normalized === "approved" || normalized === "active") {
    return "active";
  }

  if (normalized === "pending") {
    return "pending";
  }

  if (normalized === "under_review" || normalized === "additional_docs_requested") {
    return "under_review";
  }

  if (normalized === "rejected" || normalized === "banned") {
    return "banned";
  }

  if (normalized === "suspended") {
    return "suspended";
  }

  return "pending";
}

function formatSubmittedDate(dateString: string): {
  submittedAt: string;
  submittedRelative: string;
} {
  const date = new Date(dateString);
  const submittedAt = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const diffDays = Math.floor(
    (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  let submittedRelative = "Today";

  if (diffDays === 1) {
    submittedRelative = "Yesterday";
  } else if (diffDays > 1 && diffDays < 7) {
    submittedRelative = `${diffDays} days ago`;
  } else if (diffDays >= 7 && diffDays < 30) {
    submittedRelative = `${Math.floor(diffDays / 7)} weeks ago`;
  } else if (diffDays >= 30) {
    submittedRelative = `${Math.floor(diffDays / 30)} months ago`;
  }

  return { submittedAt, submittedRelative };
}

export function mapApiSellerToSeller(apiSeller: ApiSeller): Seller {
  const ownerName = `${apiSeller.FirstName ?? ""} ${apiSeller.LastName ?? ""}`.trim();
  const { submittedAt, submittedRelative } = formatSubmittedDate(apiSeller.createdAt);

  let status = toSellerStatus(apiSeller.applicantStatus);

  if (apiSeller.isBlocked) {
    status = "suspended";
  }

  const commercialRegisterImage =
    apiSeller.sellerDocuments?.commercialRegisterUrl ??
    apiSeller.commercialRegisterImage;
  const taxCardImage =
    apiSeller.sellerDocuments?.taxCardUrl ?? apiSeller.taxCardImage;

  return {
    id: apiSeller._id,
    storeName: apiSeller.storeName,
    businessId: apiSeller.commercialRegisterNumber,
    ownerName: ownerName || apiSeller.email || "—",
    ownerEmail: apiSeller.email ?? "—",
    submittedAt,
    submittedRelative,
    riskScore: 0,
    status,
    commercialRegisterNumber: apiSeller.commercialRegisterNumber,
    taxCardNumber: apiSeller.taxCardNumber,
    sellerDocuments: apiSeller.sellerDocuments,
    commercialRegisterImage,
    taxCardImage,
    storeManagement: apiSeller.storeManagement,
    notes: apiSeller.notes,
    bankAccount: apiSeller.bankAccount,
  };
}

export function mapApiSellerApplicationToSeller(
  application: ApiSellerApplication
): Seller {
  const firstName =
    application.firstName ??
    application.FirstName ??
    application.user?.firstName ??
    "";
  const lastName =
    application.lastName ??
    application.LastName ??
    application.user?.lastName ??
    "";
  const ownerName = `${firstName} ${lastName}`.trim();
  const ownerEmail = application.email ?? application.user?.email ?? "—";

  const { submittedAt, submittedRelative } = application.createdAt
    ? formatSubmittedDate(application.createdAt)
    : { submittedAt: "—", submittedRelative: "—" };

  let status = toSellerStatus(application.applicantStatus || "pending");

  if (application.isBlocked) {
    status = "suspended";
  }

  const commercialRegisterImage =
    application.sellerDocuments?.commercialRegisterUrl ??
    application.commercialRegisterImage;
  const taxCardImage =
    application.sellerDocuments?.taxCardUrl ?? application.taxCardImage;

  return {
    id: application._id,
    storeName: application.storeName || "—",
    businessId: application.commercialRegisterNumber || "—",
    ownerName: ownerName || ownerEmail,
    ownerEmail,
    phoneNumber: application.phoneNumber,
    role: application.role,
    isBlocked: application.isBlocked,
    isVerified: application.isVerified,
    createdAt: application.createdAt,
    submittedAt,
    submittedRelative,
    riskScore: 0,
    status,
    commercialRegisterNumber: application.commercialRegisterNumber,
    taxCardNumber: application.taxCardNumber,
    sellerDocuments: application.sellerDocuments,
    commercialRegisterImage,
    taxCardImage,
    notes: application.notes,
    bankAccount: application.bankAccount,
  };
}

export interface GetAllSellersParams {
  page?: number;
  limit?: number;
}

export interface AllSellersResult {
  sellers: Seller[];
  pagination: SellersPagination;
}

export async function getAllSellers(
  params: GetAllSellersParams = {}
): Promise<ApiResponse<AllSellersResult>> {
  const { page = 1, limit = 10 } = params;
  const emptyResult: AllSellersResult = {
    sellers: [],
    pagination: { page, limit, total: 0, totalPages: 1 },
  };

  try {
    const { data } = await serverClient.get<ApiResponse<ApiAllSellersData>>(
      "/allSellers",
      { params: { page, limit } }
    );

    if (data.success && data.data) {
      return {
        ...data,
        data: {
          sellers: data.data.sellers.map(mapApiSellerToSeller),
          pagination: data.data.pagination,
        },
      };
    }

    return {
      success: data.success,
      message: data.message,
      data: emptyResult,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to fetch sellers"),
      data: emptyResult,
    };
  }
}

export async function getPendingSellerApplications(
  params: GetPendingSellerApplicationsParams = {}
): Promise<ApiResponse<PendingSellerApplicationsResult>> {
  const { page = 1, limit = 5 } = params;
  const emptyResult: PendingSellerApplicationsResult = {
    sellers: [],
    applications: [],
    pagination: { page, limit, total: 0, totalPages: 1 },
  };

  try {
    const { data } = await serverClient.get<
      ApiResponse<ApiPendingSellerApplicationsData | ApiSellerApplication[]>
    >("/seller-applications/pending", {
      params: { page, limit },
    });

    if (data.success && data.data) {
      const rawList: ApiSellerApplication[] = Array.isArray(
        (data.data as ApiPendingSellerApplicationsData).applications
      )
        ? (data.data as ApiPendingSellerApplicationsData).applications
        : Array.isArray(data.data)
        ? (data.data as ApiSellerApplication[])
        : [];

      const sellers = rawList.map(mapApiSellerApplicationToSeller);
      const apiPagination = (data.data as ApiPendingSellerApplicationsData)
        .pagination;
      const total =
        apiPagination?.total ??
        (data.data as any).total ??
        sellers.length;
      const totalPages =
        apiPagination?.totalPages ??
        (data.data as any).totalPages ??
        Math.max(1, Math.ceil(total / limit));

      const pagination: SellersPagination = apiPagination ?? {
        page,
        limit,
        total,
        totalPages,
      };

      return {
        ...data,
        data: {
          sellers,
          applications: sellers,
          pagination,
        },
      };
    }

    return {
      success: data.success,
      message: data.message,
      data: emptyResult,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(
        error,
        "Failed to fetch pending seller applications"
      ),
      data: emptyResult,
    };
  }
}

export async function approveSellerApplication(
  sellerId: string
): Promise<ApiResponse<string>> {
  try {
    const { data } = await serverClient.post<ApiResponse<string>>(
      `/seller-applications/${sellerId}/approve`
    );

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to approve seller application"),
    };
  }
}

export async function rejectSellerApplication(
  sellerId: string
): Promise<ApiResponse<string>> {
  try {
    const { data } = await serverClient.post<ApiResponse<string>>(
      `/seller-applications/${sellerId}/reject`
    );

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to reject seller application"),
    };
  }
}

export async function requestAdditionalDocuments(
  sellerId: string,
  message: string
): Promise<ApiResponse<string>> {
  try {
    const { data } = await serverClient.post<ApiResponse<string>>(
      `/seller-applications/${sellerId}/request-additional-documents`,
      { message }
    );

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to request additional documents"),
    };
  }
}

export async function verifySellerBankAccount(
  sellerId: string,
  decision: BankAccountDecision
): Promise<ApiResponse<ApiSeller>> {
  try {
    const { data } = await serverClient.patch<ApiResponse<ApiSeller>>(
      `/verifySellerBankAccount/${sellerId}`,
      { decision }
    );

    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(
        error,
        `Failed to ${decision === "verified" ? "verify" : "reject"} seller bank account`
      ),
    };
  }
}

export async function approveSellerBankAccount(
  sellerId: string
): Promise<ApiResponse<ApiSeller>> {
  return verifySellerBankAccount(sellerId, "verified");
}

export async function rejectSellerBankAccount(
  sellerId: string
): Promise<ApiResponse<ApiSeller>> {
  return verifySellerBankAccount(sellerId, "rejected");
}

