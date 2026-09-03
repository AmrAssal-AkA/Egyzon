import React, { useMemo, useState } from "react";

import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import OrderViewTable from "../../components/orders/orderViewTable";
import { useOrders } from "../../hooks/useOrders";
import { Order, orderStatus } from "../../types/order.type";

type OrderStatusTab = "all" | orderStatus;

const PAGE_SIZE = 10;

const TABS: { id: OrderStatusTab; label: string }[] = [
  { id: "all", label: "All Orders" },
  { id: "pending", label: "Pending" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

function filterOrders(
  ordersList: Order[],
  query: string,
  category: string,
  tab: OrderStatusTab
): Order[] {
  const normalizedQuery = query.trim().toLowerCase();

  return ordersList.filter((order) => {
    const matchesTab = tab === "all" || order.orderStatus === tab;
    const matchesCategory = category === "all" || order.category === category;
    const fullName = `${order.FirstName} ${order.LastName}`.trim().toLowerCase();
    const matchesQuery =
      normalizedQuery.length === 0 ||
      order.orderNumber.toString().toLowerCase().includes(normalizedQuery) ||
      order.productName.toLowerCase().includes(normalizedQuery) ||
      fullName.includes(normalizedQuery) ||
      order.email.toLowerCase().includes(normalizedQuery) ||
      order.seller.toLowerCase().includes(normalizedQuery) ||
      order.storeName.toLowerCase().includes(normalizedQuery) ||
      order.category.toLowerCase().includes(normalizedQuery);

    return matchesTab && matchesCategory && matchesQuery;
  });
}

function OrdersPage(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<OrderStatusTab>("all");
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const { orders, pagination, isLoading, error } = useOrders({
    page: currentPage,
    limit: PAGE_SIZE,
  });

  const categories = useMemo(() => {
    return Array.from(new Set(orders.map((o) => o.category).filter(Boolean)));
  }, [orders]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: pagination.total > 0 ? pagination.total : orders.length,
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };
    orders.forEach((order) => {
      if (counts[order.orderStatus] !== undefined) {
        counts[order.orderStatus]++;
      }
    });
    return counts;
  }, [orders, pagination.total]);

  const filteredOrders = useMemo(
    () => filterOrders(orders, query, categoryFilter, activeTab),
    [orders, query, categoryFilter, activeTab]
  );

  const isServerPaginated = pagination.total > 0 && orders.length <= PAGE_SIZE;

  const totalPages = isServerPaginated
    ? Math.max(1, pagination.totalPages)
    : Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE));

  const paginatedOrders = useMemo(() => {
    if (isServerPaginated) {
      return filteredOrders;
    }
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredOrders.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredOrders, isServerPaginated, currentPage]);

  const totalCount = isServerPaginated
    ? pagination.total
    : filteredOrders.length;
  const pageStart =
    totalCount === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const pageEnd = isServerPaginated
    ? Math.min(currentPage * PAGE_SIZE, totalCount)
    : Math.min(currentPage * PAGE_SIZE, filteredOrders.length);

  const allPageSelected =
    paginatedOrders.length > 0 &&
    paginatedOrders.every((order) =>
      selectedIds.has(order.orderNumber.toString())
    );

  const somePageSelected =
    paginatedOrders.some((order) =>
      selectedIds.has(order.orderNumber.toString())
    ) && !allPageSelected;

  const handleTabChange = (tab: OrderStatusTab): void => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  const handleQueryChange = (value: string): void => {
    setQuery(value);
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  const handleCategoryFilterChange = (value: string): void => {
    setCategoryFilter(value);
    setCurrentPage(1);
    setSelectedIds(new Set());
  };

  const handleSelectAll = (isChecked: boolean): void => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      paginatedOrders.forEach((order) => {
        const id = order.orderNumber.toString();
        if (isChecked) {
          next.add(id);
        } else {
          next.delete(id);
        }
      });
      return next;
    });
  };

  const handleSelectOne = (orderId: string, isChecked: boolean): void => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (isChecked) {
        next.add(orderId);
      } else {
        next.delete(orderId);
      }
      return next;
    });
  };

  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    setSelectedIds(new Set());
  };

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

  if (isLoading) {
    return (
      <main className="p-6 bg-gray-50/80 min-h-full">
        <div className="flex items-center justify-center py-24 text-sm text-gray-500">
          Loading orders...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6 bg-gray-50/80 min-h-full">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-sm font-medium text-red-600">
            Failed to load orders
          </p>
          <p className="text-xs text-gray-500 mt-1">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-50/80 min-h-full">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-400 mb-2">
            Watch and audit center
          </p>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight">
            Order Management
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:min-w-[320px]">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder="Search orders, customers, products..."
              aria-label="Search orders"
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
            />
          </div>

          <div className="relative">
            <SlidersHorizontal
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              aria-hidden="true"
            />
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
              aria-hidden="true"
            />
            <select
              value={categoryFilter}
              onChange={(event) =>
                handleCategoryFilterChange(event.target.value)
              }
              aria-label="Filter by category"
              className="appearance-none w-full sm:w-auto pl-10 pr-10 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
            >
              <option value="all">Category: All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  Category: {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav
          className="flex items-center gap-6 overflow-x-auto"
          aria-label="Order status categories"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const count = statusCounts[tab.id] ?? 0;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`pb-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 ${
                  isActive
                    ? "text-gray-900 border-gray-900"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 text-[10px] rounded-full font-semibold ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <section className="bg-white border border-gray-200/80 shadow-sm rounded-xl overflow-hidden">
        {paginatedOrders.length > 0 ? (
          <OrderViewTable
            orders={paginatedOrders}
            allSelected={allPageSelected}
            someSelected={somePageSelected}
            onSelectAll={handleSelectAll}
            onSelectOne={handleSelectOne}
            selectedIds={selectedIds}
          />
        ) : (
          <div className="py-16 px-6 text-center">
            <p className="text-sm font-medium text-gray-700">No orders found</p>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 py-4 border-t border-gray-100 bg-gray-50/40">
          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">{pageStart}</span> to{" "}
            <span className="font-semibold text-gray-800">{pageEnd}</span> of{" "}
            <span className="font-semibold text-gray-800">
              {totalCount.toLocaleString()}
            </span>{" "}
            entries
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
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
                  onClick={() => handlePageChange(Number(item))}
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
                handlePageChange(Math.min(totalPages, currentPage + 1))
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

      {selectedIds.size > 0 && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md"
          role="toolbar"
          aria-label="Bulk actions"
        >
          <div className="flex items-center justify-between gap-4 bg-white border border-gray-200 rounded-xl shadow-lg p-3 mx-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                {selectedIds.size}
              </span>
              <span className="text-sm font-medium text-gray-800">
                {selectedIds.size} order{selectedIds.size > 1 ? "s" : ""}{" "}
                selected
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedIds(new Set())}
              className="text-xs font-semibold px-3 py-1.5 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default OrdersPage;
