import React from "react";
import { cn } from "@/lib/utils";

interface CarouselIndicatorsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({
  total,
  current,
  onChange,
}) => {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current;
        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange(index)}
            className="min-h-11 min-w-7 p-2 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full cursor-pointer"
            aria-label={`Go to slide ${index + 1} of ${total}`}
            aria-current={isActive ? "true" : "false"}
          >
            <span
              className={cn(
                "h-2.5 rounded-full transition-all duration-300 ease-out",
                isActive 
                  ? "w-8 bg-white shadow-xs" 
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              )}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
};
