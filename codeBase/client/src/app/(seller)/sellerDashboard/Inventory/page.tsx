import React from "react";

import ProductsContainer from "@/components/seller/dashboardComp/productPage/ProductsContainer";


export const metadata = {
  title: "Egyzon - Seller Products",
  description: "Manage your products and inventory",
  meta: {
    viewport: "width=device-width, initial-scale=1",
    robots: "noindex, nofollow",
  },
}


export default function ProductsPage() {
  return (
    <main className="min-h-screen p-4 flex flex-col gap-6 max-w-7xl mx-auto">
      <ProductsContainer />
    </main>
  );
}