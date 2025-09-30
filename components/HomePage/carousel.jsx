"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

export default function CarouselMain() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
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
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, slides.length]);

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

  return (
    <div className="w-full mx-auto p-4">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        {/* Main carousel container */}
        <div
          className="relative h-96 md:h-[500px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                index === currentSlide
                  ? "translate-x-0"
                  : index < currentSlide
                    ? "-translate-x-full"
                    : "translate-x-full"
              }`}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-75`}
              />
            </div>
          ))}

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Auto-play toggle */}
          <button
            onClick={toggleAutoPlay}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
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
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
