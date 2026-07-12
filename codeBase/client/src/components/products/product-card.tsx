
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Products {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  brand: string;
  inStock?: boolean;
  stock?: number;
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  image,
  category,
  rating,
  brand,
  inStock,
  stock,
}: Products) {
  const availability = typeof stock === "number" ? stock > 0 : Boolean(inStock);

  const status = (() => {
    if (typeof stock === "number") {
      if (stock <= 0) return "out";
      if (stock <= 10) return "low";
      return "in";
    }
    return availability ? "in" : "out";
  })();

  const isAvailable = status !== "out";

  return (
    <div className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden border border-border">
      <Link href={`/products/${id}` } >
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded">
          {brand}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm mt-1">{description}</p>

        <p className="text-muted-foreground text-xs mt-1">{category}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="bg-yellow-500 text-white px-2 py-1 rounded">
            {rating} ★
          </div>
          <p
            className={`text-xs px-3 py-1 rounded-lg text-white ${status === "in" ? "bg-green-500" : status === "low" ? "bg-yellow-600" : "bg-red-500"}`}
          >
            {status === "in"
              ? "In Stock"
              : status === "low"
                ? `Low Stock (${stock})`
                : "Out of Stock"}
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-foreground font-bold mt-4">
            {price.toFixed(2)} EGP
          </p>
          <button
            disabled={!isAvailable}
            className={`px-4 py-2 rounded transition-colors duration-300 ease-in-out ${
              isAvailable
                ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                : "bg-gray-300 text-muted-foreground cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
      </Link>
    </div>
  );
}
