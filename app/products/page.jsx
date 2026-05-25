import React, { Suspense } from "react";

import ProductGrid from "@/components/product/ProductGrid";
import {ProductsData, categories } from "@/lib/Products";



export default async function Products() {

  return (
    <div className="mt-40">

      <section className="p-10">
            <h1 className="text-5xl text-center font-bold mb-10">
        Explore Our <span className="text-yellow-500">Products</span>
      </h1>
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductGrid products={ProductsData} />
        </Suspense>
      </section>
    </div>
  );
}
