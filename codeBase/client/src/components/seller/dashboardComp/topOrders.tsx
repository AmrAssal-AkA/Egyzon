"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useSellerOrders } from "@/hooks/useSeller";
import { SellerOrder } from "@/types/seller";

export type TopOrderItem = {
  id: string | number;
  orderId: string;
  customerName: string;
  totalAmount: number;
  status: string;
  orderDate: string;
};

type TopOrdersProps = {
  topOrders?: (TopOrderItem | SellerOrder)[];
};

function normalizeOrder(
  order: TopOrderItem | SellerOrder,
  index: number
): TopOrderItem {
  const rawOrder = order as SellerOrder;
  const id = (order as TopOrderItem).id ?? rawOrder._id ?? rawOrder.id ?? index + 1;
  const orderId =
    (order as TopOrderItem).orderId ||
    rawOrder.orderNumber ||
    `#${String(id).slice(-4)}`;

  let customerName = (order as TopOrderItem).customerName;
  if (!customerName) {
    if (typeof rawOrder.customer === "object" && rawOrder.customer !== null) {
      customerName = rawOrder.customer.FirstName || `Customer #${String(id).slice(-4)}`;
    } else if (typeof rawOrder.customer === "string" && rawOrder.customer.trim() !== "") {
      customerName = `Customer #${rawOrder.customer.slice(-4)}`;
    } else {
      customerName = `Customer #${String(id).slice(-4)}`;
    }
  }

  const totalAmount =
    typeof (order as TopOrderItem).totalAmount === "number"
      ? (order as TopOrderItem).totalAmount
      : Number(rawOrder.totalAmount || rawOrder.subTotal || 0);

  const status =
    (order as TopOrderItem).status ||
    rawOrder.orderStatus ||
    rawOrder.status ||
    "Pending";

  let orderDate = (order as TopOrderItem).orderDate;
  if (!orderDate) {
    const rawDate = rawOrder.orderDate || rawOrder.createdAt;
    if (rawDate) {
      try {
        const dateObj = new Date(rawDate);
        orderDate = !isNaN(dateObj.getTime())
          ? dateObj.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : String(rawDate);
      } catch {
        orderDate = String(rawDate);
      }
    } else {
      orderDate = "Recent";
    }
  }

  return {
    id,
    orderId,
    customerName,
    totalAmount,
    status,
    orderDate,
  };
}

function getStatusBadgeClass(status: string): string {
  const normalized = status.toLowerCase();
  if (
    normalized === "delivered" ||
    normalized === "confirmed" ||
    normalized === "completed"
  ) {
    return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60";
  }
  if (
    normalized === "pending" ||
    normalized === "processing" ||
    normalized === "placed"
  ) {
    return "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60";
  }
  if (normalized === "shipped") {
    return "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60";
  }
  return "bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400 border border-red-200 dark:border-red-800/60";
}

export default function TopOrders({ topOrders: propTopOrders }: TopOrdersProps = {}) {
  const { orders: apiOrders, isLoading } = useSellerOrders();

  const rawOrders =
    propTopOrders !== undefined ? propTopOrders : apiOrders;
  const orders: TopOrderItem[] =
    rawOrders && rawOrders.length > 0
      ? rawOrders.slice(0, 5).map(normalizeOrder)
      : [];

  return (
    <div className="w-full h-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-4 flex flex-col gap-3">
      <h2 className="text-2xl font-medium text-black dark:text-white font-stretch-normal">
        Top Orders
      </h2>

      {isLoading && propTopOrders === undefined ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2 animate-pulse rounded-lg"
            >
              <div className="flex flex-col gap-1.5">
                <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="h-5 w-20 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-7 w-20 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500 dark:text-gray-400">
          <ShoppingBag className="h-8 w-8 stroke-1 text-gray-400 mb-2" />
          <p className="text-sm font-medium">No orders found</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between py-2.5 px-2 hover:bg-gray-50 dark:hover:bg-slate-800/50 rounded-xl transition-all duration-200"
            >
              <div className="flex flex-col min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {order.customerName}
                </p>
                <p className="text-xs text-gray-400 dark:text-slate-500">
                  {order.orderId}
                </p>
              </div>
              <p className="text-base font-bold text-gray-900 dark:text-gray-100">
                {order.totalAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                EGP
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                {order.orderDate}
              </p>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full text-center capitalize ${getStatusBadgeClass(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center pt-2">
        <Link
          href="/sellerDashboard/orders"
          className="text-base font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:underline"
        >
          See More
        </Link>
      </div>
    </div>
  );
}

