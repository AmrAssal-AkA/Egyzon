"use client";

import React from "react";
import Image from "next/image";
import {
  X,
  Calendar,
  User,
  MapPin,
  CreditCard,
  Package,
} from "lucide-react";
import { SellerOrder } from "@/types/seller";
import { Button } from "@/components/ui/button";

interface OrderDetailsModalProps {
  order: SellerOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailsModal({
  order,
  isOpen,
  onClose,
}: OrderDetailsModalProps) {
  if (!isOpen || !order) return null;

  const orderId =
    order.orderNumber ||
    (order._id ? `#ORD-${String(order._id).slice(-4)}` : `#ORD-${order.id}`);

  let customerName = order.customerName;
  let customerEmail = "";
  if (typeof order.customer === "object" && order.customer !== null) {
    customerName =
      order.customer.name ||
      `${order.customer.FirstName || ""} ${order.customer.LastName || ""}`.trim() ||
      customerName ||
      "Customer";
    customerEmail = order.customer.email || "";
  } else if (typeof order.customer === "string") {
    customerName = customerName || `Customer #${order.customer.slice(-4)}`;
  } else {
    customerName = customerName || "Customer";
  }

  const orderStatus = order.orderStatus || order.status || "Pending";

  const getStatusBadge = (status: string) => {
    const norm = status.toLowerCase();
    if (norm === "delivered" || norm === "completed" || norm === "confirmed") {
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60";
    }
    if (norm === "shipped") {
      return "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200 dark:border-blue-800/60";
    }
    if (norm === "pending") {
      return "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800/60";
    }
    if (norm === "processing") {
      return "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/60";
    }
    return "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800/60";
  };

  const rawDate = order.orderDate || order.createdAt;
  let formattedDate = "Recent";
  if (rawDate) {
    try {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
    } catch {
      formattedDate = String(rawDate);
    }
  }

  const items = Array.isArray(order.orderItems) ? order.orderItems : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-mono">
                  {orderId}
                </h2>
                <span
                  className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize ${getStatusBadge(
                    orderStatus
                  )}`}
                >
                  {orderStatus}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 space-y-5 flex-1">
          {/* Customer & Shipping Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Details */}
            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Customer</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {customerName}
              </p>
              {customerEmail && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {customerEmail}
                </p>
              )}
            </div>

            {/* Delivery Address */}
            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Shipping Address</span>
              </div>
              {order.address ? (
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {order.address.address1}
                  {order.address.address2 ? `, ${order.address.address2}` : ""}
                  <br />
                  {order.address.city}, {order.address.state}{" "}
                  {order.address.postalCode}
                  <br />
                  {order.address.country}
                </p>
              ) : (
                <p className="text-xs text-slate-400">Standard Delivery</p>
              )}
            </div>
          </div>

          {/* Items Breakdown */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <Package className="w-4 h-4" />
              <span>Order Items ({items.length})</span>
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
              {items.map((item, idx) => {
                const prod =
                  typeof item.product === "object" && item.product !== null
                    ? item.product
                    : null;
                const title =
                  prod?.productName ||
                  prod?.name ||
                  (typeof item.product === "string" ? item.product : `Product #${idx + 1}`);

                let imgUrl = "";
                if (prod && prod.imageUrl) {
                  imgUrl = Array.isArray(prod.imageUrl)
                    ? prod.imageUrl[0]
                    : prod.imageUrl;
                }

                return (
                  <div
                    key={idx}
                    className="p-3 sm:p-4 flex items-center justify-between gap-3 bg-white dark:bg-slate-900"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 overflow-hidden flex items-center justify-center shrink-0">
                        {imgUrl &&
                        (imgUrl.startsWith("http") ||
                          imgUrl.startsWith("/") ||
                          imgUrl.startsWith("blob:")) ? (
                          <Image
                            src={imgUrl}
                            alt={title}
                            width={48}
                            height={48}
                            unoptimized
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="w-5 h-5 text-slate-400" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {title}
                        </p>
                        <p className="text-xs text-slate-400">
                          Qty: {item.quantity} × EGP{" "}
                          {(item.unitPrice || 0).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        EGP{" "}
                        {(
                          item.subtotal ||
                          item.unitPrice * item.quantity ||
                          0
                        ).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment & Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Payment Method */}
            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30 flex flex-col justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                <CreditCard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Payment</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 capitalize">
                  {order.paymentMethod?.method || "Cash On Delivery"}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                  Status: {order.paymentStatus || "Completed"}
                </p>
              </div>
            </div>

            {/* Totals */}
            <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  EGP {(order.subTotal || order.totalAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
              {order.shippingFee !== undefined && order.shippingFee > 0 && (
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Shipping Fee</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    EGP {order.shippingFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              )}
              {order.discount !== undefined && order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Discount</span>
                  <span>-EGP {order.discount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-2 flex justify-between text-sm font-bold text-slate-900 dark:text-slate-100">
                <span>Total Amount</span>
                <span>
                  EGP {(order.totalAmount || order.subTotal || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-xl px-4 cursor-pointer"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
