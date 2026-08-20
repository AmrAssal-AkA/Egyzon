"use client";

import Image from "next/image";
import React, { useState } from "react";

interface CategoryCardProps {
  image?: string;
  name: string;
  description?: string;
  productCount?: number;
}

export default function CategoryCard({
  image,
  name,
  description,
  productCount,
}: CategoryCardProps) {
  const [imgSrc, setImgSrc] = useState(
    image && image.trim() !== "" ? image : "/images/placeholder.png"
  );

  return (
    <div className="relative group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 h-64 sm:h-72 w-full flex flex-col justify-end">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={imgSrc}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
          onError={() => setImgSrc("/images/placeholder.png")}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
      </div>

      <div className="relative z-10 p-5 text-white flex flex-col justify-end">
        {typeof productCount === "number" && (
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-300 mb-1">
            {productCount} {productCount === 1 ? "Product" : "Products"}
          </span>
        )}
        <h3 className="text-xl font-bold tracking-tight text-white mb-1 group-hover:text-blue-200 transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-gray-200 line-clamp-2 leading-snug">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
