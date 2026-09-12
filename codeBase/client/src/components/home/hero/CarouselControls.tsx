import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  prevLabel?: string;
  nextLabel?: string;
}

export const CarouselControls: React.FC<CarouselControlsProps> = ({
  onPrev,
  onNext,
  prevLabel = "Previous slide",
  nextLabel = "Next slide",
}) => {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 border border-white/30 text-white backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group-hover:opacity-100 md:opacity-0 opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-black/50"
        aria-label={prevLabel}
      >
        <ChevronLeft className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 border border-white/30 text-white backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 group-hover:opacity-100 md:opacity-0 opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-black/50"
        aria-label={nextLabel}
      >
        <ChevronRight className="w-6 h-6 stroke-[1.5]" aria-hidden="true" />
      </button>
    </>
  );
};
