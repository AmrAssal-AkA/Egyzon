"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square w-full rounded-2xl bg-muted border border-border flex items-center justify-center text-muted-foreground text-sm">
        No image available
      </div>
    );
  }

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col w-full">
      {/* Main Image */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-muted/30 border border-border flex items-center justify-center">
        <Image
          src={activeImage}
          alt={`${title} - view ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto py-1 mt-4 scrollbar-none snap-x">
          {images.map((img, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={`${img}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative aspect-square w-16 md:w-20 rounded-lg overflow-hidden border bg-muted/20 shrink-0 cursor-pointer transition-all duration-200 snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? "border-black dark:border-white ring-1 ring-black dark:ring-white scale-95"
                    : "border-border hover:border-muted-foreground"
                }`}
                aria-label={`Show image ${index + 1} of ${images.length}`}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-1"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
