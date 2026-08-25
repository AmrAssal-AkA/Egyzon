"use client";

import React from "react";

import { useCartStore } from "@/stores/buyer/useCart";
import { ConfirmationBanner } from "./_components/confirmBanner";
import { OrderReview } from "./_components/orderReview";
import { DeliveryOptions } from "./_components/DeliveryOptions";
import { PaymentMethods } from "./_components/PaymentMethods";
import { AddressSection } from "./_components/AddressSection";
import { ActionBar } from "./_components/ActionBar";

// Types and Interfaces
import {
  CheckoutConfirmationProps,
  ConfirmationBannerProps,
  DeliveryOptionsProps,
  OrderReviewProps,
  PaymentMethodsProps,
  AddressSectionProps,
  ActionBarProps,
  OrderItem,
  OrderSummary,
  DeliveryOption,
  PaymentMethod,
  Address,
} from "@/types/cart.type";

export type {
  CheckoutConfirmationProps,
  ConfirmationBannerProps,
  DeliveryOptionsProps,
  OrderReviewProps,
  PaymentMethodsProps,
  AddressSectionProps,
  ActionBarProps,
};

export default function CheckoutConfirmation({
  onChooseAddress = () => console.log("Choose address callback triggered"),
  onAddAddress = () => console.log("Add address callback triggered"),
  onBackHome = () => console.log("Back to home callback triggered"),
  onPrintReceipt = () => console.log("Print receipt callback triggered"),
  onDownloadInvoice = () => console.log("Download invoice callback triggered"),
  onFinalizeConfirmation = () =>
    console.log("Finalize confirmation callback triggered"),
}: CheckoutConfirmationProps) {
  const { lastOrder } = useCartStore();
  const orderNumber = lastOrder?.orderNumber || "N/A";
  const orderStatus = lastOrder?.orderStatus || "Confirmed";
  const orderDate = lastOrder?.orderDate || new Date().toLocaleDateString();

  const orderItems: OrderItem[] = lastOrder
    ? lastOrder.orderItems.map((item) => ({
        id: item.id,
        image: item.thumbnail,
        name: item.title,
        variant: undefined,
        quantity: item.quantity,
        unitPrice: item.price,
        total: item.price * item.quantity,
      }))
    : [];

  const summary: OrderSummary = lastOrder?.summary || {
    subtotal: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    total: 0,
    currency: "EGP",
  };

  const delivery: DeliveryOption = lastOrder?.delivery || {
    method: "Standard Shipping",
    estimatedDelivery: "3-5 business days",
    trackingAvailable: true,
  };

  const payment: PaymentMethod = lastOrder?.payment || {
    type: "Credit Card",
    provider: "Visa",
    last4: "XXXX",
    status: "Paid" as const,
  };

  const address: Address = (lastOrder?.address as Address) || {
    id: "default",
    fullName: "Guest User",
    phone: "N/A",
    street: "N/A",
    city: "N/A",
    governorate: "N/A",
    postalCode: "N/A",
    country: "N/A",
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-7xl flex flex-col gap-6 md:gap-8">
        {/* Banner */}
        <ConfirmationBanner
          orderNumber={orderNumber}
          orderStatus={orderStatus}
          orderDate={orderDate}
        />

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-start">
          {/* Order Review (Left on desktop, stacks on mobile/tablet) */}
          <div className="lg:col-span-3 w-full">
            <OrderReview orderItems={orderItems} summary={summary} />
          </div>

          {/* Sidebar info (Right on desktop, stacks on mobile/tablet) */}
          <div className="lg:col-span-2 w-full flex flex-col gap-6">
            <DeliveryOptions delivery={delivery} />
            <PaymentMethods payment={payment} />
            <AddressSection
              address={address}
              onChooseAddress={onChooseAddress}
              onAddAddress={onAddAddress}
            />
          </div>
        </div>

        {/* Action Bar */}
        <ActionBar
          onBackHome={onBackHome}
          onPrintReceipt={onPrintReceipt}
          onDownloadInvoice={onDownloadInvoice}
          onFinalizeConfirmation={onFinalizeConfirmation}
        />
      </div>
    </div>
  );
}
