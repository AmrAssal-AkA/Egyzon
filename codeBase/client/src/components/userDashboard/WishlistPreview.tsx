"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

import { useWishlistStore } from "@/stores/buyer/wishlist";

export default function WishlistPreview() {
  const {items} = useWishlistStore(); 
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Wishlist Preview</h3>
        <Link href="/dashboard/wishlist" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          See All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.length === 0 ? (
            <p className="ext-muted-foreground text-center dark:text-gray-200">Your wishlist is empty</p>
        ) : (
        <>
          {items?.slice(0, 3).map((item) => (
            <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center group hover:shadow-md transition duration-200 ease-in-out">
              <Image 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-full h-32 object-cover rounded-md mb-4 group-hover:scale-105 transition-transform duration-200"
              />
              <h4 className="text-sm font-medium text-gray-900 dark:text-white text-center line-clamp-1 mb-2">
                {item.title}
              </h4>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4">
                ${item.price.toFixed(2)}
              </p>
              <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-200">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          ))}
        </>
        )}
      </div>
    </div>
  );
}
