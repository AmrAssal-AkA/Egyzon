import React from "react";
import { Loader2, ShieldCheck, Lock, Truck } from "lucide-react";
import { PaymentMethodType } from "@/types/order.types";

interface OrderSummaryCardProps {
  subtotal: number;
  shipping: number;
  taxes?: number;
  discount?: number;
  grandTotal: number;
  currency?: string;
  itemCount: number;
  isSubmitting: boolean;
  paymentMethod: PaymentMethodType;
  onConfirmOrder: () => void;
}

export function OrderSummaryCard({
  subtotal,
  shipping,
  taxes = 0,
  discount = 0,
  grandTotal,
  currency = "EGP",
  itemCount,
  isSubmitting,
  paymentMethod,
  onConfirmOrder,
}: OrderSummaryCardProps) {
  const isFreeShipping = shipping === 0;

  return (
    <div className="border border-border rounded-2xl p-6 bg-card text-card-foreground shadow-sm flex flex-col gap-5 sticky top-24">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-foreground">
            Order Summary
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {itemCount} {itemCount === 1 ? "item" : "items"} in cart
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-full">
          <Lock className="w-3.5 h-3.5 text-primary" />
          <span>Secure</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Items Subtotal</span>
          <span className="font-semibold text-foreground">
            {subtotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            {currency}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-muted-foreground" />
            Shipping Fee
          </span>
          <span
            className={`font-semibold ${
              isFreeShipping
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-foreground"
            }`}
          >
            {isFreeShipping
              ? "Free"
              : `${shipping.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} ${currency}`}
          </span>
        </div>

        {/* Taxes */}
        {taxes > 0 && (
          <div className="flex justify-between items-center text-muted-foreground">
            <span>Estimated Taxes (VAT)</span>
            <span className="font-semibold text-foreground">
              +
              {taxes.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {currency}
            </span>
          </div>
        )}

        {/* Discount */}
        {discount > 0 && (
          <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400">
            <span>Discount Applied</span>
            <span className="font-semibold">
              -
              {discount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {currency}
            </span>
          </div>
        )}

        {/* Grand Total */}
        <div className="border-t border-border my-1 pt-4 flex justify-between items-baseline">
          <div className="flex flex-col">
            <span className="font-bold text-base text-foreground">
              Total Amount
            </span>
            <span className="text-xs text-muted-foreground">
              {paymentMethod === "cashOnDelivery"
                ? "Pay with cash upon delivery"
                : "Secure online payment"}
            </span>
          </div>
          <span className="text-xl font-bold text-foreground">
            {grandTotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            {currency}
          </span>
        </div>
      </div>

      {/* Place Order Action Button */}
      <button
        type="button"
        onClick={onConfirmOrder}
        disabled={isSubmitting || itemCount === 0}
        className="w-full mt-1 bg-primary text-primary-foreground font-semibold py-3.5 px-4 rounded-xl hover:bg-primary/90 transition-all active:scale-[0.99] cursor-pointer text-center flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing Order...</span>
          </>
        ) : (
          <span>
            {paymentMethod === "creditCard"
              ? "Proceed to Payment"
              : "Confirm & Place Order"}
          </span>
        )}
      </button>

      {/* Trust & Guarantees */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
        <span>Guaranteed safe & secure checkout</span>
      </div>
    </div>
  );
}

export default OrderSummaryCard;
