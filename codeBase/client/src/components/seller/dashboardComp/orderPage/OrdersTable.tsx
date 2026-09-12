"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Eye, Package, ShoppingBag } from "lucide-react";
import { SellerOrder } from "@/types/seller";

interface OrdersTableProps {
  orders: SellerOrder[];
  isLoading?: boolean;
  onSelectOrder: (order: SellerOrder) => void;
  itemsPerPage?: number;
}

export default function OrdersTable({
  orders,
  isLoading = false,
  onSelectOrder,
  itemsPerPage = 10,
}: OrdersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(orders.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  // Helper for customer avatar initials and colors
  const getCustomerInfo = (order: SellerOrder) => {
    let name = order.customerName || "";
    if (typeof order.customer === "object" && order.customer !== null) {
      name =
        order.customer.name ||
        `${order.customer.FirstName || ""} ${order.customer.LastName || ""}`.trim() ||
        order.customer.email ||
        name;
    } else if (typeof order.customer === "string" && order.customer.trim() !== "") {
      name = name || `Customer #${order.customer.slice(-4)}`;
    }
    if (!name) name = "Customer";

    // Extract initials
    const parts = name.trim().split(" ");
    let initials = parts[0]?.charAt(0).toUpperCase() || "C";
    if (parts.length > 1) {
      initials += parts[parts.length - 1]?.charAt(0).toUpperCase() || "";
    }

    // Determine deterministic background color based on name
    const colors = [
      "bg-blue-600 text-white",
      "bg-slate-800 text-white dark:bg-slate-700",
      "bg-slate-400 text-white dark:bg-slate-600",
      "bg-indigo-600 text-white",
      "bg-emerald-600 text-white",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash) % colors.length;

    return { name, initials, colorClass: colors[colorIndex] };
  };

  const getStatusBadge = (status?: string) => {
    const norm = (status || "Pending").toLowerCase();
    if (norm === "delivered" || norm === "completed" || norm === "confirmed") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 capitalize">
          Delivered
        </span>
      );
    }
    if (norm === "shipped") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60 capitalize">
          Shipped
        </span>
      );
    }
    if (norm === "pending") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 capitalize">
          Pending
        </span>
      );
    }
    if (norm === "processing") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 capitalize">
          Processing
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 capitalize">
        Cancelled
      </span>
    );
  };

  const formatDate = (rawDate?: string | Date) => {
    if (!rawDate) return "-";
    try {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
      return String(rawDate);
    } catch {
      return String(rawDate);
    }
  };

  // Pagination page numbers generator
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden flex flex-col">
      {/* Mobile Card List View (Visible on small screens, hidden on md and up) */}
      <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
        {isLoading ? (
          // Mobile Skeletons
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 space-y-3 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="h-5 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3.5 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="h-8 w-12 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            </div>
          ))
        ) : paginatedOrders.length === 0 ? (
          <div className="py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <ShoppingBag className="w-6 h-6 stroke-1 text-slate-400" />
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              No orders found
            </p>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
              There are no orders matching your current search or tab filter.
            </p>
          </div>
        ) : (
          paginatedOrders.map((order, idx) => {
            const orderId =
              order.orderNumber ||
              (order._id
                ? `#ORD-${String(order._id).slice(-6).toUpperCase()}`
                : `#ORD-${String(order.id || idx + 1)}`);

            const customer = getCustomerInfo(order);
            const orderItems = Array.isArray(order.orderItems)
              ? order.orderItems
              : [];

            // Thumbnail handling
            const firstItem = orderItems[0];
            const firstProd =
              typeof firstItem?.product === "object" && firstItem?.product !== null
                ? firstItem.product
                : null;
            const imageSrc = firstProd
              ? Array.isArray(firstProd.imageUrl)
                ? firstProd.imageUrl[0]
                : firstProd.imageUrl
              : "";

            const remainingCount = orderItems.length - 1;
            const amount = Number(order.totalAmount || order.subTotal || 0);
            const status = order.orderStatus || order.status || "Pending";

            return (
              <div
                key={String(order._id || order.id || idx)}
                onClick={() => onSelectOrder(order)}
                className="p-4 space-y-3 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 active:bg-slate-100/70 dark:active:bg-slate-800/70 transition-colors cursor-pointer"
              >
                {/* Top: ID + Status */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {orderId}
                  </span>
                  {getStatusBadge(status)}
                </div>

                {/* Customer Info & Date */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${customer.colorClass}`}
                    >
                      {customer.initials}
                    </div>
                    <span className="font-medium text-xs text-slate-900 dark:text-slate-100 truncate">
                      {customer.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0">
                    {formatDate(order.orderDate || order.createdAt)}
                  </span>
                </div>

                {/* Items preview + Price + Details Action */}
                <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-100/80 dark:border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-8 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 overflow-hidden flex items-center justify-center shrink-0">
                      {imageSrc &&
                      (imageSrc.startsWith("http") ||
                        imageSrc.startsWith("/") ||
                        imageSrc.startsWith("blob:")) ? (
                        <Image
                          src={imageSrc}
                          alt="Order item"
                          width={40}
                          height={32}
                          unoptimized
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-4 h-4 text-slate-400" />
                      )}

                      {remainingCount > 0 && (
                        <div className="absolute inset-0 bg-blue-900/40 dark:bg-blue-950/60 backdrop-blur-[1px] flex items-center justify-center text-[9px] font-bold text-white">
                          +{remainingCount}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {orderItems.length} {orderItems.length === 1 ? "item" : "items"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                      EGP{" "}
                      {amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectOrder(order);
                      }}
                      title="View order details"
                      aria-label="View order details"
                      className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop Table View (Visible on md screens and up) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-slate-50/70 dark:bg-slate-800/50 border-b border-slate-200/70 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <th scope="col" className="py-4 px-6">
                ORDER ID
              </th>
              <th scope="col" className="py-4 px-6">
                CUSTOMER
              </th>
              <th scope="col" className="py-4 px-6">
                ITEMS
              </th>
              <th scope="col" className="py-4 px-6">
                DATE
              </th>
              <th scope="col" className="py-4 px-6">
                AMOUNT
              </th>
              <th scope="col" className="py-4 px-6">
                STATUS
              </th>
              <th scope="col" className="py-4 px-6 text-right">
                ACTIONS
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {isLoading ? (
              // Loading Skeletons
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="py-4 px-6">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
                      <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-9 w-14 bg-slate-200 dark:bg-slate-800 rounded-lg" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-lg ml-auto" />
                  </td>
                </tr>
              ))
            ) : paginatedOrders.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={7} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                      <ShoppingBag className="w-6 h-6 stroke-1 text-slate-400" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      No orders found
                    </p>
                    <p className="text-xs text-slate-400 max-w-sm">
                      There are no orders matching your current search or tab
                      filter.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              // Order Rows
              paginatedOrders.map((order, idx) => {
                const orderId =
                  order.orderNumber ||
                  (order._id
                    ? `#ORD-${String(order._id).slice(-6).toUpperCase()}`
                    : `#ORD-${String(order.id || idx + 1)}`);

                const customer = getCustomerInfo(order);
                const orderItems = Array.isArray(order.orderItems)
                  ? order.orderItems
                  : [];

                // Thumbnail handling
                const firstItem = orderItems[0];
                const firstProd =
                  typeof firstItem?.product === "object" &&
                  firstItem?.product !== null
                    ? firstItem.product
                    : null;
                const imageSrc = firstProd
                  ? Array.isArray(firstProd.imageUrl)
                    ? firstProd.imageUrl[0]
                    : firstProd.imageUrl
                  : "";

                const remainingCount = orderItems.length - 1;

                const amount = Number(
                  order.totalAmount || order.subTotal || 0
                );

                const status = order.orderStatus || order.status || "Pending";

                return (
                  <tr
                    key={String(order._id || order.id || idx)}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
                    onClick={() => onSelectOrder(order)}
                  >
                    {/* Order ID */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="font-mono text-sm font-medium text-slate-900 dark:text-slate-100 underline decoration-slate-300 dark:decoration-slate-600 underline-offset-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {orderId}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${customer.colorClass}`}
                        >
                          {customer.initials}
                        </div>
                        <span className="font-medium text-sm text-slate-900 dark:text-slate-100">
                          {customer.name}
                        </span>
                      </div>
                    </td>

                    {/* Items Preview */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="relative w-11 h-9 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 overflow-hidden flex items-center justify-center shrink-0">
                          {imageSrc &&
                          (imageSrc.startsWith("http") ||
                            imageSrc.startsWith("/") ||
                            imageSrc.startsWith("blob:")) ? (
                            <Image
                              src={imageSrc}
                              alt="Order item"
                              width={44}
                              height={36}
                              unoptimized
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="w-4 h-4 text-slate-400" />
                          )}

                          {remainingCount > 0 && (
                            <div className="absolute inset-0 bg-blue-900/40 dark:bg-blue-950/60 backdrop-blur-[1px] flex items-center justify-center text-[10px] font-bold text-white">
                              +{remainingCount}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                      {formatDate(order.orderDate || order.createdAt)}
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-6 whitespace-nowrap font-bold text-sm text-slate-900 dark:text-slate-100">
                      EGP{" "}
                      {amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      {getStatusBadge(status)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 whitespace-nowrap text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectOrder(order);
                        }}
                        title="View order details"
                        aria-label="View order details"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all cursor-pointer inline-flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer / Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 px-4 sm:px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <span className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
          Showing{" "}
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {orders.length === 0 ? 0 : startIndex + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {Math.min(startIndex + itemsPerPage, orders.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {orders.length}
          </span>{" "}
          results
        </span>

        {/* Pagination Navigation */}
        <div className="flex items-center gap-1.5 justify-center">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1 || isLoading}
            aria-label="Previous page"
            className="p-2 sm:p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Desktop full pagination numbers */}
          <div className="hidden sm:flex items-center gap-1.5">
            {getPageNumbers().map((page, i) =>
              typeof page === "number" ? (
                <button
                  type="button"
                  key={i}
                  onClick={() => setCurrentPage(page)}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    currentPage === page
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span key={i} className="px-1 text-slate-400 text-xs">
                  ...
                </span>
              )
            )}
          </div>

          {/* Mobile compact page indicator */}
          <span className="sm:hidden text-xs font-medium text-slate-600 dark:text-slate-400 px-2">
            {currentPage} / {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0 || isLoading}
            aria-label="Next page"
            className="p-2 sm:p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
