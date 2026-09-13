"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { HeroCarouselProps } from "../../../types/Hero.types";
import { DEFAULT_SLIDES } from "./carousel-data";
import { HeroSlide } from "./HeroSlide";
import { CarouselControls } from "./CarouselControls";
import { CarouselIndicators } from "./CarouselIndicators";

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  slides = DEFAULT_SLIDES,
  autoPlayInterval = 6000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    },
    [nextSlide, prevSlide],
  );

  // Auto-play timer effect
  useEffect(() => {
    if (autoPlayInterval <= 0 || isPaused || totalSlides <= 1) return;

    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, isPaused, nextSlide, totalSlides]);

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (diff > minSwipeDistance) {
      nextSlide();
    } else if (diff < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (totalSlides === 0) return null;

  return (
    <section
      className="w-full max-w-10xl mx-auto px-4 md:px-20 mt-24 mb-10"
      aria-label="Promotional Campaigns"
    >
      <div
        className="relative w-full h-155 sm:h-137.5 md:h-120 lg:h-135 rounded-[24px] md:rounded-[32px] overflow-hidden shadow-md group outline-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
      >
        {/* Slides Wrapper */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${totalSlides}`}
              aria-hidden={index !== currentIndex}
              inert={index !== currentIndex}
              className="absolute inset-0 w-full h-full"
            >
              <HeroSlide
                slide={slide}
                isActive={index === currentIndex}
                isPriority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Previous/Next Navigation Controls */}
        {totalSlides > 1 && (
          <CarouselControls
            onPrev={prevSlide}
            onNext={nextSlide}
            prevLabel="Previous Campaign Slide"
            nextLabel="Next Campaign Slide"
          />
        )}

        {/* Pagination Indicators */}
        {totalSlides > 1 && (
          <CarouselIndicators
            total={totalSlides}
            current={currentIndex}
            onChange={goToSlide}
          />
        )}
      </div>
    </section>
  );
};
