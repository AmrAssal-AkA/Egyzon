import React from "react";
import { Metadata } from "next";
import StoreCreationContainer from "@/components/seller/storeCreationComp/StoreCreationContainer";

export const metadata: Metadata = {
  title: "Create Your Store | Egyzon Seller",
  description:
    "Set up your storefront so customers can discover your business and products.",
};

export default function StoreFrontPage() {
  return (
    <main className="w-full min-h-full">
      <StoreCreationContainer />
    </main>
  );
}
