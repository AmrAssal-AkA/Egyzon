"use client";
import {useState} from "react";
import Image from "next/image"

import { LastOrder } from "@/stores/buyer/useCart";
import { Trash2, Calendar, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
import {toast} from "sonner";




export interface OrderCardProps {
  order: LastOrder;
  onRemove: (orderNumber: string) => void;
}



export function OrderCard({ order, onRemove }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTrackShipment = () => {
    toast.info(`Tracking details for ${order.orderNumber} are not available yet. The seller is preparing your order.`);
  };

  return (
    <div className="bg-card text-card-foreground shadow-md hover:shadow-lg rounded-xl overflow-hidden border border-border flex flex-col p-6 transition-all duration-300">
      {/* Order Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-lg text-foreground">{order.orderNumber}</span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            order.orderStatus === "Confirmed" ? "bg-green-500/10 text-green-600 dark:text-green-400" :
            "bg-amber-500/10 text-amber-600 dark:text-amber-400"
          }`}>
            {order.orderStatus}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{order.orderDate}</span>
        </div>
      </div>

      {/* Items Preview */}
      <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-x-auto py-1">
          {order.orderItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="relative w-16 h-16 rounded-lg border border-border bg-muted overflow-hidden shrink-0 group">
              <Image
                src={item.thumbnail || "/images/placeholder.jpg"}
                alt={item.title}
                fill
                className="object-cover"
                sizes="64px"
              />
              <span className="absolute bottom-1 right-1 bg-background/90 text-foreground text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm border border-border">
                x{item.quantity}
              </span>
            </div>
          ))}
        </div>
        <div className="text-left sm:text-right">
          <span className="text-xs text-muted-foreground block">Total Amount</span>
          <span className="text-lg font-bold text-foreground">
            {(order.total || order.subtotal).toFixed(2)} EGP
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
          <button
            onClick={() => onRemove(order.orderNumber)}
            className="inline-flex items-center justify-center p-2 bg-destructive/10 hover:bg-destructive hover:text-white text-destructive rounded-lg transition-all cursor-pointer"
            aria-label="Delete order from history"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 border-t border-border pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
          {/* Items list detail */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">Items in Order</h4>
            <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-2">
              {order.orderItems.map((item, idx) => (
                <div key={`${item.id}-detail-${idx}`} className="flex items-center gap-3 border border-border/60 rounded-lg p-2.5 bg-muted/10">
                  <div className="relative w-12 h-12 rounded overflow-hidden border border-border bg-muted shrink-0">
                    <Image
                      src={item.thumbnail || "/images/placeholder.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.price.toFixed(2)} EGP x {item.quantity}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-foreground">{(item.price * item.quantity).toFixed(2)} EGP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Summary & Payment */}
          <div className="flex flex-col gap-4">
            <div className="bg-muted/30 rounded-xl p-4 border border-border/50 text-xs flex flex-col gap-2">
              <h4 className="font-semibold text-sm text-foreground pb-2 border-b border-border/40">Order Summary</h4>
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium text-foreground">{(order.subtotal || 0).toFixed(2)} EGP</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="font-medium text-foreground">{order.shipping === 0 ? "Free" : `${(order.shipping || 0).toFixed(2)} EGP`}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Taxes (14%)</span>
                <span className="font-medium text-foreground">{(order.tax || 0).toFixed(2)} EGP</span>
              </div>
              {order.discount ? order.discount > 0 && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Discount</span>
                  <span className="font-medium text-green-600 dark:text-green-400">-{order.discount.toFixed(2)} EGP</span>
                </div>
              ) : null}
              <div className="border-t border-border/40 pt-2 mt-1 flex justify-between font-bold text-sm text-foreground">
                <span>Grand Total</span>
                <span>{(order.total || 0).toFixed(2)} EGP</span>
              </div>
            </div>

            {order.payment && (
              <div className="bg-muted/10 rounded-xl p-3 border border-border/40 text-xs flex flex-col gap-1.5">
                <h4 className="font-semibold text-foreground">Payment Details</h4>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span className="text-foreground font-medium">{order.payment.type} ({order.payment.provider})</span>
                </div>
                <p className="text-muted-foreground">Card ending: <span className="text-foreground font-medium">*{order.payment.last4}</span></p>
                <p className="text-muted-foreground">Status: <span className="text-green-600 dark:text-green-400 font-semibold">{order.payment.status}</span></p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}