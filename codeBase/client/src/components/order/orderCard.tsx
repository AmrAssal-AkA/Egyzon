"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/hooks/useAuth";
import { useCustomerOrderHistory } from "@/hooks/useCustomer";
import { CustomerOrderItem, CustomerProductItem } from "@/types/customer";
import { Trash2, Calendar, CreditCard, ChevronDown, ChevronUp, PackageCheck } from "lucide-react";
import { toast } from "sonner";

interface OrderCardProps {
  order?: CustomerOrderItem;
  onRemove?: (orderNumber: string) => void;
}

const getProductImageUrl = (
  product?: CustomerProductItem | Record<string, unknown>
): string => {
  if (!product) return "/images/placeholder.jpg";

  const rawImage = (product as { imageUrl?: string | string[] }).imageUrl 
  if (Array.isArray(rawImage)) {
    const valid = rawImage.find(
      (url) => typeof url === "string" && url.trim().length > 0
    );
    if (valid) return valid.trim();
  } else if (typeof rawImage === "string" && rawImage.trim().length > 0) {
    return rawImage.trim();
  }

  return "/images/placeholder.jpg";
};

const getStatusBadgeStyle = (status?: string) => {
  const s = (status || "").toLowerCase();
  if (s === "delivered" || s === "completed") {
    return "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20";
  }
  if (s === "shipped") {
    return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20";
  }
  if (s === "processing" || s === "in_progress") {
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20";
  }
  if (s === "cancelled" || s === "failed") {
    return "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20";
  }
  return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20";
};

const formatDate = (dateStr?: string) => {
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

export function OrderCard({ order, onRemove }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();
  const { orders, isLoading } = useCustomerOrderHistory();

  // If order prop is not supplied, fallback to fetching recent order from customer history
  const currentOrder: CustomerOrderItem | undefined = order || orders[0];

  if (!order && !user) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Please log in to view your recent orders
          </h3>
          <Link
            href="/login"
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Log In
          </Link>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Sign in to your account to view your order history and track shipments.
        </p>
      </div>
    );
  }

  if (!order && isLoading) {
    return (
      <div className="bg-card text-card-foreground shadow-md rounded-xl border border-border p-6 flex flex-col gap-4 animate-pulse">
        <div className="flex justify-between items-center pb-4 border-b border-border">
          <div className="h-6 w-36 bg-muted rounded" />
          <div className="h-4 w-28 bg-muted rounded" />
        </div>
        <div className="flex justify-between items-center py-4">
          <div className="flex gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="w-16 h-16 rounded-lg bg-muted" />
            ))}
          </div>
          <div className="h-6 w-24 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!currentOrder) {
    return null;
  }

  const handleTrackShipment = () => {
    toast.info(
      `Tracking details for order ${currentOrder.orderNumber} are not available yet. The seller is preparing your order.`
    );
  };

  const totalAmount =
    typeof currentOrder.totalAmount === "number"
      ? currentOrder.totalAmount
      : currentOrder.subTotal || 0;

  const orderItems = Array.isArray(currentOrder.orderItems)
    ? currentOrder.orderItems
    : [];

  return (
    <div className="bg-card text-card-foreground shadow-md hover:shadow-lg rounded-xl overflow-hidden border border-border flex flex-col p-6 transition-all duration-300">
      {/* Order Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-lg text-foreground">
            {currentOrder.orderNumber || "Order"}
          </span>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${getStatusBadgeStyle(
              currentOrder.orderStatus
            )}`}
          >
            {currentOrder.orderStatus || "Pending"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(currentOrder.orderDate)}</span>
        </div>
      </div>

      {/* Items Preview */}
      <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-x-auto py-1 max-w-full">
          {orderItems.map((item, index) => {
            const product = item.product;
            const title = product?.productName || "Product";
            const imageUrl = getProductImageUrl(product);
            const itemKey = item._id || product?._id || `item-${index}`;

            return (
              <div
                key={itemKey}
                className="relative w-16 h-16 rounded-lg border border-border bg-muted overflow-hidden shrink-0 group"
                title={title}
              >
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
                <span className="absolute bottom-1 right-1 bg-background/90 text-foreground text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-border">
                  x{item.quantity}
                </span>
              </div>
            );
          })}
        </div>
        <div className="text-left sm:text-right shrink-0">
          <span className="text-xs text-muted-foreground block">Total Amount</span>
          <span className="text-lg font-bold text-foreground">
            {totalAmount.toFixed(2)} EGP
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4 mt-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
        >
          {isExpanded ? (
            <>
              Hide details <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              View details <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTrackShipment}
            className="inline-flex items-center justify-center gap-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-semibold px-3.5 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Track Shipment
          </button>
          {onRemove && (
            <button
              onClick={() => onRemove(currentOrder.orderNumber)}
              className="inline-flex items-center justify-center p-2 bg-destructive/10 hover:bg-destructive hover:text-white text-destructive rounded-lg transition-all cursor-pointer"
              aria-label="Delete order from history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 border-t border-border pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
          {/* Items list detail */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-primary" />
              Items in Order ({orderItems.length})
            </h4>
            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2">
              {orderItems.map((item, idx) => {
                const product = item.product;
                const title = product?.productName || "Product";
                const imageUrl = getProductImageUrl(product);
                const unitPrice = item.price || product?.price || 0;
                const itemTotal = unitPrice * (item.quantity || 1);
                const itemKey = item._id || product?._id || `item-detail-${idx}`;

                return (
                  <div
                    key={itemKey}
                    className="flex items-center gap-3 border border-border/60 rounded-lg p-2.5 bg-muted/10"
                  >
                    <div className="relative w-12 h-12 rounded overflow-hidden border border-border bg-muted shrink-0">
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {title}
                      </p>
                      {product?.sku && (
                        <p className="text-[11px] text-muted-foreground">
                          SKU: {product.sku}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {unitPrice.toFixed(2)} EGP x {item.quantity}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-foreground">
                        {itemTotal.toFixed(2)} EGP
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cost Summary & Payment */}
          <div className="flex flex-col gap-4">
            <div className="bg-muted/30 rounded-xl p-4 border border-border/50 text-xs flex flex-col gap-2">
              <h4 className="font-semibold text-sm text-foreground pb-2 border-b border-border/40">
                Order Summary
              </h4>
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium text-foreground">
                  {(currentOrder.subTotal ?? totalAmount).toFixed(2)} EGP
                </span>
              </div>
              {currentOrder.discount && currentOrder.discount > 0 ? (
                <div className="flex justify-between text-muted-foreground">
                  <span>Discount</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    -{currentOrder.discount.toFixed(2)} EGP
                  </span>
                </div>
              ) : null}
              <div className="border-t border-border/40 pt-2 mt-1 flex justify-between font-bold text-sm text-foreground">
                <span>Total</span>
                <span>{totalAmount.toFixed(2)} EGP</span>
              </div>
            </div>

            {currentOrder.payment && (
              <div className="bg-muted/10 rounded-xl p-3 border border-border/40 text-xs flex flex-col gap-1.5">
                <h4 className="font-semibold text-foreground">Payment Details</h4>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span className="text-foreground font-medium capitalize">
                    {currentOrder.payment.method ||
                      currentOrder.payment.type ||
                      "Payment"}
                  </span>
                </div>
                {currentOrder.payment.last4 && (
                  <p className="text-muted-foreground">
                    Card ending:{" "}
                    <span className="text-foreground font-medium">
                      *{currentOrder.payment.last4}
                    </span>
                  </p>
                )}
                {currentOrder.payment.status && (
                  <p className="text-muted-foreground">
                    Status:{" "}
                    <span className="text-green-600 dark:text-green-400 font-semibold capitalize">
                      {currentOrder.payment.status}
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}