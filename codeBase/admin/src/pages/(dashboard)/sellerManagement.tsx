import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import SellerTable, { SellerRowAction } from "../../components/sellers/SellerTable";
import {SellerViewModel} from "../../components/sellers/sellerViewModel";
import { useAlert } from "../../hooks/useAlert";
import { useAllSellers } from "../../hooks/useAllSellers";
import { usePendingSellerApplications } from "../../hooks/usePendingSellerApplications";
import {
  approveSellerApplication,
  approveSellerBankAccount,
  rejectSellerApplication,
  rejectSellerBankAccount,
  requestAdditionalDocuments,
} from "../../services/seller.services";
import {
  Seller,
  SellerFilterId,
  SELLER_FILTER_STATUS,
} from "../../types/seller";

const PAGE_SIZE = 10;

const STATUS_FILTERS: { id: SellerFilterId; name: string }[] = [
  { id: 1, name: "Active" },
  { id: 2, name: "pending" },
  { id: 3, name: "suspended" },
  { id: 4, name: "banned" },
  { id: 5, name: "under review" },
];

const PENDING_FILTER_ID: SellerFilterId = 2;

function SellerManagement(): React.ReactElement {
  const [activeFilter, setActiveFilter] = useState<SellerFilterId>(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [isViewModelOpen, setIsViewModelOpen] = useState(false);

  const isPendingTab = activeFilter === PENDING_FILTER_ID;

  const {
    sellers: allSellers,
    pagination: allPagination,
    isLoading: allLoading,
    error: allError,
    refresh: refreshAll,
  } = useAllSellers({
    page: currentPage,
    limit: PAGE_SIZE,
  });

  const {
    sellers: pendingSellers,
    pagination: pendingPagination,
    isLoading: pendingLoading,
    error: pendingError,
    refresh: refreshPending,
  } = usePendingSellerApplications({
    page: currentPage,
    limit: PAGE_SIZE,
  });

  const { showError, showSuccess } = useAlert();

  const isLoading = isPendingTab ? pendingLoading : allLoading;
  const error = isPendingTab ? pendingError : allError;
  const refresh = isPendingTab ? refreshPending : refreshAll;

  const filteredSellers = useMemo(() => {
    if (isPendingTab) {
      return pendingSellers;
    }

    return allSellers.filter(
      (seller) => seller.status === SELLER_FILTER_STATUS[activeFilter]
    );
  }, [isPendingTab, pendingSellers, allSellers, activeFilter]);

  const pagination = isPendingTab ? pendingPagination : allPagination;
  const totalPages = Math.max(1, pagination.totalPages);

  const pageStart =
    pagination.total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const pageEnd = Math.min(currentPage * PAGE_SIZE, pagination.total);


  const paginationItems = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    ];
  }, [currentPage, totalPages]);

  const handleFilterChange = (filterId: SellerFilterId): void => {
    setActiveFilter(filterId);
    setCurrentPage(1);
  };

  const handleApproveSeller = async (seller: Seller): Promise<void> => {
    try {
      const response = await approveSellerApplication(seller.id);

      if (!response.success) {
        showError(response.message || "Failed to approve seller application.");
        return;
      }

      await refresh();
      showSuccess(`${seller.storeName} has been approved successfully.`);
    } catch {
      showError("Something went wrong while approving the seller.");
    }
  };

  const handleRejectSeller = async (seller: Seller): Promise<void> => {
    try {
      const response = await rejectSellerApplication(seller.id);

      if (!response.success) {
        showError(response.message || "Failed to reject seller application.");
        return;
      }

      await refresh();
      showSuccess(`${seller.storeName} application has been rejected.`);
    } catch {
      showError("Something went wrong while rejecting the seller application.");
    }
  };

  const handleRequestAdditionalDocs = async (
    seller: Seller,
    message: string
  ): Promise<void> => {
    try {
      const response = await requestAdditionalDocuments(seller.id, message);

      if (!response.success) {
        showError(
          response.message || "Failed to request additional documents."
        );
        return;
      }

      await refresh();
      showSuccess(
        `Request for additional documents sent to ${seller.storeName}.`
      );
    } catch {
      showError("Something went wrong while requesting additional documents.");
    }
  };

  const handleApproveBankAccount = async (seller: Seller): Promise<void> => {
    try {
      const response = await approveSellerBankAccount(seller.id);

      if (!response.success) {
        showError(response.message || "Failed to approve seller bank account.");
        return;
      }

      await refresh();
      showSuccess(
        `${seller.storeName}'s bank account has been approved and verified.`
      );
    } catch {
      showError("Something went wrong while approving the bank account.");
    }
  };

  const handleRejectBankAccount = async (seller: Seller): Promise<void> => {
    try {
      const response = await rejectSellerBankAccount(seller.id);

      if (!response.success) {
        showError(response.message || "Failed to reject seller bank account.");
        return;
      }

      await refresh();
      showSuccess(
        `${seller.storeName}'s bank account has been rejected.`
      );
    } catch {
      showError("Something went wrong while rejecting the bank account.");
    }
  };


  const handleSellerAction = (
    action: SellerRowAction,
    seller: Seller
  ): void => {
    if (action === "view" || action === "requestDocs") {
      setSelectedSeller(seller);
      setIsViewModelOpen(true);
      return;
    }

    if (action === "approve") {
      void handleApproveSeller(seller);
      return;
    }

    if (action === "reject") {
      void handleRejectSeller(seller);
    }
  };

  if (isLoading) {
    return (
      <main className="p-6 bg-gray-50/80 min-h-full">
        <div className="flex items-center justify-center py-24 text-sm text-gray-500">
          Loading sellers...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6 bg-gray-50/80 min-h-full">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-sm font-medium text-red-600">
            Failed to load sellers
          </p>
          <p className="text-xs text-gray-500 mt-1">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-50/80 min-h-full">
      <div className="justify-normal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Seller Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your sellers and their accounts
          </p>
        </div>

        <div
          className="inline-flex items-center p-1 rounded-full bg-[#F2F2F2] border border-gray-200/70 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] overflow-x-auto max-w-full"
          role="tablist"
          aria-label="Seller status filters"
        >
          {STATUS_FILTERS.map((item) => {
            const isActive = activeFilter === item.id;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleFilterChange(item.id)}
                className={`px-5 py-2 text-sm font-serif capitalize whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "rounded-full bg-white text-gray-900 shadow-[0_1px_4px_rgba(0,0,0,0.1)]"
                    : "rounded-full text-gray-600 hover:text-gray-800 bg-transparent"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      <section className="bg-white border border-gray-200/80 shadow-sm rounded-xl overflow-hidden">
        {filteredSellers.length > 0 ? (
          <SellerTable
            sellers={filteredSellers}
            onSellerAction={handleSellerAction}
          />
        ) : (
          <div className="py-16 px-6 text-center">
            <p className="text-sm font-medium text-gray-700">
              No sellers found
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Try selecting a different status filter.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 py-4 border-t border-gray-100 bg-gray-50/40">
          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">{pageStart}</span> to{" "}
            <span className="font-semibold text-gray-800">{pageEnd}</span> of{" "}
            <span className="font-semibold text-gray-800">
              {pagination.total}
            </span>{" "}
            entries
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-white hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {paginationItems.map((item, index) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-1 text-sm text-gray-400"
                >
                  ...
                </span>
              ) : (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCurrentPage(Number(item))}
                  aria-label={`Page ${item}`}
                  aria-current={currentPage === item ? "page" : undefined}
                  className={`min-w-8 h-8 px-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-white"
                  }`}
                >
                  {item}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-white hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <SellerViewModel
        seller={selectedSeller}
        isOpen={isViewModelOpen}
        onClose={() => setIsViewModelOpen(false)}
        onApprove={handleApproveSeller}
        onReject={handleRejectSeller}
        onRequestDocs={handleRequestAdditionalDocs}
        onApproveBankAccount={handleApproveBankAccount}
        onRejectBankAccount={handleRejectBankAccount}
      />
    </main>
  );
}

export default SellerManagement;

