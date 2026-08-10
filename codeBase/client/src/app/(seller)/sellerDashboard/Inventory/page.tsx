import React from "react";

import ProductsContainer from "@/components/seller/dashboardComp/productPage/ProductsContainer";

export default function ProductsPage() {
  return (
    <main className="min-h-screen p-4 flex flex-col gap-6 max-w-7xl mx-auto">
      <ProductsContainer />
    </main>
  );
}