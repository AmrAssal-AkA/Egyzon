"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";

export default function CarouselMain() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef(null);

  const slides = [
    {
      id: 1,
      image: "/HomePage/Banner.png",
    },
    {
      id: 2,
      image: "/HomePage/PageBanner.png",
    },
    {
      id: 3,
      image: "/HomePage/Banner3.png",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, isHovered, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Keyboard navigation support
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  return (
    <div className="w-full max-w-8xl mx-auto p-4 sm:p-6 lg:p-8">
      <div
        className="group relative overflow-hidden rounded-3xl shadow-2xl bg-gray-900"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-roledescription="carousel"
      >
        {/* Main carousel container */}
        <div
          className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          aria-live={isAutoPlaying ? "off" : "polite"}
        >
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? "translate-x-0 opacity-100 z-10 scale-100"
                  : index < currentSlide
                    ? "-translate-x-full opacity-0 z-0 scale-95"
                    : "translate-x-full opacity-0 z-0 scale-95"
              }`}
              aria-hidden={index !== currentSlide}
            >
              {/* Background image */}
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover select-none"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>
          ))}

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-full p-2.5 sm:p-3 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-full p-2.5 sm:p-3 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Auto-play toggle */}
          <button
            onClick={toggleAutoPlay}
            className="absolute top-4 right-4 z-20 bg-white/10 hover:bg-white/30 backdrop-blur-md border border-white/20 rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Toggle autoplay"
          >
            {isAutoPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 outline-none focus:ring-2 focus:ring-yellow-400 ${
                index === currentSlide
                  ? "bg-yellow-400 w-8"
                  : "bg-white/50 hover:bg-white/80 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 z-20">
          <div
            className="h-full bg-yellow-400 transition-all duration-500 ease-out"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
