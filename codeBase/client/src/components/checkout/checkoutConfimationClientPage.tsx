"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/buyer/useCart";
import CheckoutConfirmation from "./CheckoutConfirmation";

export default function CheckoutConfirmationClientPage() {
  const router = useRouter();
  const { lastOrder } = useCartStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && (!lastOrder || !lastOrder.orderNumber)) {
      router.replace("/");
    }
  }, [isHydrated, lastOrder, router]);

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
