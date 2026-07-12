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
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current;
        return (
          <button
            key={index}
            onClick={() => onChange(index)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-white/70 cursor-pointer",
              isActive 
                ? "w-8 bg-white" 
                : "w-2.5 bg-white/40 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={isActive ? "true" : "false"}
          />
        );
      })}
    </div>
  );
};
