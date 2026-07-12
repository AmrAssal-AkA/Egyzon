"use client";

import { memo, type ReactNode, useId, useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface FilterAccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

function FilterAccordion({ title, children, defaultOpen = true }: FilterAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <section className="border-b border-border last:border-b-0">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-foreground transition-colors duration-300 ease-in-out hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span>{title}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-300 ease-in-out",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        id={contentId}
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-4">{children}</div>
        </div>
      </div>
    </section>
  );
}

export default memo(FilterAccordion);
