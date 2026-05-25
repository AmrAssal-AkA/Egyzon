"use client";
import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

import Quantity from "@/components/product/quantityselector";
import useHandleAddToCart from "@/Hooks/useHandleAddToCart";

export default function productDetailPage({ product }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useHandleAddToCart();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 mt-24 lg:mt-32 mb-20">
      <div className="lg:grid lg:grid-cols-2 lg:items-start gap-10 xl:gap-16 space-y-10 lg:space-y-0">
        {/* Left Column: Product Image */}
        <div className="relative w-full rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm flex justify-center items-center p-8 sm:p-12 aspect-square lg:aspect-auto lg:h-[600px]">
          <Image
            src={product.image}
            alt={product.name}
            width={100}
            height={100}
            className="w-full h-full object-contain object-center transform hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="flex flex-col lg:sticky lg:top-32">
          <div className="pb-8 border-b border-gray-100">
            {product.category && (
              <h3 className="text-sm text-gray-500 mb-2 uppercase tracking-wider font-semibold">
                {product.category}
              </h3>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-yellow-600">
              {Number(product.price).toFixed(2)} EGP
            </p>
          </div>

          <div className="py-8 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Description
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="py-8 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
              <div className="w-full sm:w-auto">
                <Quantity quantity={quantity} onQuantityChange={setQuantity} />
              </div>
              <div className="w-full sm:flex-1">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-white px-4 py-1 rounded-lg hover:bg-yellow-600 transition-colors duration-300 font-semibold"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
