import React from "react";

import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function ProductImagePreview({ images }: { images: string[] }) {
  return (
    <section className="flex h-full w-full items-center justify-center bg-gray-100">
      <Carousel
        className="w-full h-full"
        orientation="horizontal"
        opts={{ loop: true, dragFree: false, align: "center" }}
      >
        <CarouselContent className="h-full">
          <CarouselItem className="relative h-full">
            <Image
              src={images[0]}
              alt="Product image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </section>
  );
}
