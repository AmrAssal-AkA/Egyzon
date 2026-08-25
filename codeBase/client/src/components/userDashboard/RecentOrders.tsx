"use client";

import React from "react";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import { useCustomerOrderHistory } from "@/hooks/useCustomer";
import { CustomerOrderItem } from "@/types/customer";

const getStatusBadge = (status: string) => {
  const s = (status || "").toLowerCase();
  if (s === "delivered" || s === "completed") {
    return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
  }
  if (s === "processing" || s === "in_progress") {
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300";
  }
  if (s === "pending" || s === "confirmed") {
    return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
  }
  if (s === "shipped") {
    return "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300";
  }
  if (s === "cancelled" || s === "failed") {
    return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
  }
  return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
};

export default function RecentOrders() {
  const { user } = useAuth();
  const { orders, isLoading } = useCustomerOrderHistory();

  if (!user) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Orders
          </h3>
          <Link
            href="/dashboard/myOrder"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            View All
          </Link>
        </div>
        <p className="text-muted-foreground text-center dark:text-gray-200">
          Please log in to view your recent orders.
        </p>
      </div>
    );
  }

  // Display recent 5 orders
  const recentOrders: CustomerOrderItem[] = orders.slice(0, 5);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Orders
        </h3>
        <Link
          href="/dashboard/myOrder"
          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Order ID</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Total Amount</th>
              <th className="px-4 py-3 rounded-tr-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [1, 2, 3].map((i) => (
                <tr key={i} className="border-b dark:border-gray-700 animate-pulse">
                  <td className="px-4 py-3">
                    <div className="h-4 w-28 bg-muted rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-20 bg-muted rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-16 bg-muted rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-6 w-20 bg-muted rounded-full" />
                  </td>
                </tr>
              ))
            ) : recentOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-muted-foreground dark:text-gray-400"
                >
                  No recent orders found.
                </td>
              </tr>
            ) : (
              recentOrders.map((order, index) => {
                const orderKey =
                  order._id || order.orderNumber || `order-${index}`;
                return (
                  <tr key={orderKey} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {order.orderNumber || order._id || `#${index + 1}`}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground dark:text-gray-300">
                      {formatDate(order.orderDate)}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {typeof order.totalAmount === "number"
                        ? `${order.totalAmount.toFixed(2)} EGP`
                        : `${order.totalAmount} EGP`}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

