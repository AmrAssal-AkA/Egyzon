import Image from "next/image";
import React from "react";

import { OrderReviewProps } from "./CheckoutConfirmation";

export function OrderReview({ orderItems, summary }: OrderReviewProps) {
  return (
    <section className="flex flex-col gap-6 bg-card text-card-foreground border border-border rounded-2xl p-6 md:p-8 shadow-2xs">
      <div className="border-b border-border pb-4">
        <h2 className="text-xl font-bold font-serif text-foreground">Order Review</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Items in this shipment</p>
      </div>

      <ul className="flex flex-col gap-4 divide-y divide-border/60">
        {orderItems.map((item, index) => (
          <li
            key={item.id}
            className={`flex items-center gap-4 ${index > 0 ? "pt-4" : ""}`}
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
              {item.variant && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Variant: <span className="font-medium text-foreground">{item.variant}</span>
                </p>
              )}
              <div className="flex items-center justify-between mt-2 flex-wrap gap-1">
                <span className="text-xs text-muted-foreground">
                  Qty: <span className="font-medium text-foreground">{item.quantity}</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  Unit: <span className="font-medium text-foreground">{item.unitPrice.toLocaleString()} {summary.currency}</span>
                </span>
              </div>
            </div>

            <div className="text-right shrink-0 font-semibold">
              <span className="font-bold text-foreground">
                {item.total.toLocaleString()} {summary.currency}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t border-border pt-6 mt-2 flex flex-col gap-3 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-medium text-foreground">
            {summary.subtotal.toLocaleString()} {summary.currency}
          </span>
        </div>
        
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span className="font-medium text-foreground">
            {summary.shipping === 0 ? "Free" : `+${summary.shipping.toLocaleString()} ${summary.currency}`}
          </span>
        </div>

        {summary.tax > 0 && (
          <div className="flex justify-between text-muted-foreground">
            <span>Tax (VAT)</span>
            <span className="font-medium text-foreground">
              +{summary.tax.toLocaleString()} {summary.currency}
            </span>
          </div>
        )}

        {summary.discount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Discount</span>
            <span>
              -{summary.discount.toLocaleString()} {summary.currency}
            </span>
          </div>
        )}

        <div className="border-t border-border pt-4 mt-2 flex justify-between font-bold text-lg text-foreground">
          <span>Grand Total</span>
          <span className="font-serif">
            {summary.total.toLocaleString()} {summary.currency}
          </span>
        </div>
      </div>
    </section>
  );
}