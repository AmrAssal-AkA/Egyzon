"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CheckoutConfirmation from "./CheckoutConfirmation";

export default function CheckoutConfirmationClientPage() {
      const router = useRouter();

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
  return (
       <CheckoutConfirmation
      onFinalizeConfirmation={handleFinalize}
      onBackHome={handleBackHome}
      onPrintReceipt={handlePrint}
      onDownloadInvoice={handleDownload}
      onChooseAddress={handleChooseAddress}
      onAddAddress={handleAddAddress}
    />
  )
}
