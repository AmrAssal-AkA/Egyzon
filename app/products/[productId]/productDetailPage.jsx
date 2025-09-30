"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

import Quantity from "@/components/product/quantityselector";
import useHandleAddToCart from "@/Hooks/useHandleAddToCart";

export default function productDetailPage({ product }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useHandleAddToCart();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <p className="text-2xl font-semibold mb-6">
              {Number(product.price).toFixed(2)} EGP
            </p>
          </div>
          <div className="flex flex-row space-x-5">
            <Quantity quantity={quantity} onQuantityChange={setQuantity} />
            <button
              onClick={() => addToCart(product, quantity)}
              className="mt-10 bg-yellow-400 text-white rounded-3xl hover:bg-transparent hover:text-black w-35 h-10 cursor-pointer hover:border-1"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
