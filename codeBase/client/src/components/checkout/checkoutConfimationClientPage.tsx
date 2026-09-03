"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Loader2,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";

import { useCartStore } from "@/stores/buyer/useCart";
import CheckoutConfirmation from "./CheckoutConfirmation";

function formatCardBrand(rawBrand?: string | null): string {
  if (!rawBrand) return "Credit Card";
  const lower = rawBrand.toLowerCase().trim();
  if (lower.includes("master")) return "MasterCard";
  if (lower.includes("visa")) return "Visa";
  if (lower.includes("meeza")) return "Meeza";
  if (lower.includes("amex") || lower.includes("american"))
    return "American Express";
  return rawBrand.charAt(0).toUpperCase() + rawBrand.slice(1);
}

function extractLast4(pan?: string | null): string {
  if (!pan) return "";
  const digits = pan.replace(/\D/g, "");
  return digits.length >= 4 ? digits.slice(-4) : digits;
}

export default function CheckoutConfirmationClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lastOrder, updateLastOrderPayment } = useCartStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPaymentFailed, setIsPaymentFailed] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const successParam = searchParams.get("success");
    const errorOccurred = searchParams.get("error_occured") === "true";
    const pan =
      searchParams.get("source_data.pan") ||
      searchParams.get("pan") ||
      searchParams.get("card_pan") ||
      searchParams.get("last4");
    const rawBrand =
      searchParams.get("source_data.sub_type") ||
      searchParams.get("sub_type") ||
      searchParams.get("card_brand") ||
      searchParams.get("brand");

    if (successParam !== null) {
      if (successParam === "true" && !errorOccurred) {
        const last4Digits = extractLast4(pan);
        const brand = formatCardBrand(rawBrand);
        updateLastOrderPayment({
          provider: brand,
          last4: last4Digits || "••••",
          status: "Paid",
          orderStatus: "Confirmed",
        });
        setIsPaymentFailed(false);
      } else {
        updateLastOrderPayment({
          status: "Failed",
          orderStatus: "Payment Failed",
        });
        setIsPaymentFailed(true);
      }
    }
  }, [isHydrated, searchParams, updateLastOrderPayment]);

  useEffect(() => {
    if (
      isHydrated &&
      !isPaymentFailed &&
      (!lastOrder || !lastOrder.orderNumber)
    ) {
      router.replace("/");
    }
  }, [isHydrated, isPaymentFailed, lastOrder, router]);

  const handleFinalize = () => {
    router.push("/");
  };

  const handleBackHome = () => {
    router.push("/");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    console.log("Download invoice triggered");
  };

  const handleChooseAddress = () => {
    console.log("Choose Address callback from parent");
  };

  const handleAddAddress = () => {
    console.log("Add Address callback from parent");
  };

  if (!isHydrated) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">
          Loading order confirmation...
        </p>
      </div>
    );
  }

  if (isPaymentFailed) {
    return (
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center gap-6 p-8 bg-card border border-destructive/20 rounded-2xl shadow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold font-serif text-foreground">
            Payment Unsuccessful
          </h2>
          <p className="text-sm text-muted-foreground">
            We couldn&apos;t process your payment. Your card was not charged.
            Please try again or choose another payment method.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <Link
            href="/checkout"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Checkout Again
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-semibold text-sm rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!lastOrder || !lastOrder.orderNumber) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
          <ShoppingBag className="w-6 h-6 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground">
          No Completed Order Found
        </h2>
        <p className="text-sm text-muted-foreground max-w-md">
          This page is only accessible after completing an order. Redirecting to
          home...
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary/90 transition-colors cursor-pointer"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <CheckoutConfirmation
      onFinalizeConfirmation={handleFinalize}
      onBackHome={handleBackHome}
      onPrintReceipt={handlePrint}
      onDownloadInvoice={handleDownload}
      onChooseAddress={handleChooseAddress}
      onAddAddress={handleAddAddress}
    />
  );
}
