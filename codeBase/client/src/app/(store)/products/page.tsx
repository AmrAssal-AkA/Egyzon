import React, { Suspense } from "react";

import ShopProductsClient from "@/components/products/ShopProductsClient";
import ProductsLoading from "@/app/(store)/products/loading";

export const metadata = {
  title: "Egyzon - Browse Products",
  description: "Browse and explore a wide range of products on Egyzon.",
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <main className="w-full min-h-screen bg-background flex flex-col items-center justify-start py-15">
        <div className="w-full max-w-10xl px-4 md:px-20 mt-30">
          <h1 className="text-6xl font-bold text-foreground mb-6 ">
            Browse Products
          </h1>
          <ShopProductsClient />
        </div>
      </main>
    </Suspense>
  );
}

