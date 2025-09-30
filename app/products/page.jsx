import React, { Suspense } from "react";

import ProductGrid from "@/components/product/ProductGrid";
import {ProductsData, categories } from "@/lib/Products";



export default async function ProductsAndCategory() {

  return (
    <div className="mt-40">
      <h1 className="text-5xl text-center font-bold">
        Browse <span className="text-yellow-500">products and categories</span>
      </h1>

      {/* categories section */}
      <section className="m-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-8xl mx-auto mt-5 shadow-lg">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer "
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-85 fill"
              />
              <div className="p-4 text-center">
                <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                <p className="text-gray-600 mb-4">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="p-10">
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductGrid products={ProductsData} />
        </Suspense>
      </section>
    </div>
  );
}
