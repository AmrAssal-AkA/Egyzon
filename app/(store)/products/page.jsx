import React from "react";

import ProductPageClient from "@/components/product/ProductPageClient";

export default function Products() {
  return (
    <div className="mt-40">
      <section className="p-10">
        <h1 className="text-5xl text-center font-bold mb-10">
          Explore Our <span className="text-yellow-500">Products</span>
        </h1>
        <ProductPageClient />
      </section>
    </div>
  );
}
