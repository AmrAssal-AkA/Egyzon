import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HeroSlideItem } from "./types";
import { cn } from "@/lib/utils";

interface HeroSlideProps {
  slide: HeroSlideItem;
  isActive: boolean;
}

export const HeroSlide: React.FC<HeroSlideProps> = ({ slide, isActive }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center px-6 py-10 sm:p-12 md:px-16 md:py-8 lg:px-20 transition-all duration-700 ease-in-out",
        isActive 
          ? "opacity-100 translate-x-0 pointer-events-auto" 
          : "opacity-0 translate-x-12 pointer-events-none"
      )}
      style={{
        background: slide.bgGradient || "linear-gradient(135deg, #7A7E85 0%, #A8ABB0 50%, #E3E5E8 100%)"
      }}
    >
      {/* Left Column: Typography & CTAs */}
      <div className="md:col-span-7 flex flex-col items-start justify-center text-left order-2 md:order-1 h-full">
        {/* Campaign Label */}
        <span className="inline-block px-4 py-1.5 text-[11px] font-bold tracking-wider text-white bg-blue-600 rounded-md mb-6 uppercase shadow-sm animate-fade-in">
          {slide.campaignLabel}
        </span>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white font-medium leading-[1.1] mb-6 tracking-tight">
          {slide.headline}
          {slide.headlineItalic && (
            <span className="block mt-1 italic font-normal font-serif text-white/95">
              {slide.headlineItalic}
            </span>
          )}
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed max-w-lg mb-8">
          {slide.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href={slide.primaryCtaLink}
            className="inline-flex items-center justify-center bg-white text-black font-semibold text-sm px-6 py-3 rounded-md border border-white hover:bg-neutral-100 hover:border-neutral-100 active:scale-95 transition-all duration-300 shadow-sm cursor-pointer"
          >
            {slide.primaryCtaText}
          </Link>
          
          {slide.secondaryCtaText && slide.secondaryCtaLink && (
            <Link
              href={slide.secondaryCtaLink}
              className="inline-flex items-center justify-center bg-transparent text-white font-semibold text-sm px-6 py-3 rounded-md border border-white hover:bg-white/10 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              {slide.secondaryCtaText}
            </Link>
          )}
        </div>
      </div>

      {/* Right Column: Promotional Artwork */}
      <div className="md:col-span-5 flex items-center justify-center order-1 md:order-2 h-48 sm:h-64 md:h-full relative w-full">
        <div className="relative w-full h-full max-h-[220px] sm:max-h-[280px] md:max-h-[400px] aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/15">
          <Image
            src={slide.imageUrl}
            alt={`${slide.headline} ${slide.headlineItalic || ""}`}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            priority={isActive}
            className="object-cover transition-transform duration-[8000ms] ease-out hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};
