"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { testimonials } from "../../../types/data";

export default function Testimonials() {
  return (
    <section className="w-full py-16 md:py-24 bg-slate-50 dark:bg-muted/10 border-y border-border/80">
      <div className="container mx-auto px-4 md:px-20 text-center">
        {/* Heading */}
        <div className="max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Voices of Success
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear directly from independent vendors and business owners who have
            scaled their operations on Egyzon.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col text-left p-8 md:p-10 rounded-[20px] bg-background border border-border/80 shadow-sm hover:shadow-md transition-all duration-300 relative group"
            >
              {/* Quote Icon decorative */}
              <div className="absolute top-8 right-8 text-blue-100 dark:text-blue-950/80 pointer-events-none group-hover:scale-110 transition-transform duration-300">
                <Quote className="size-10 fill-current" />
              </div>

              {/* Quote Text */}
              <blockquote className="text-base md:text-lg text-foreground/80 leading-relaxed italic flex-grow mb-8 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Avatar Info */}
              <div className="flex items-center gap-4 border-t border-border/50 pt-6">
                <div className="relative size-12 md:size-14 rounded-full overflow-hidden border border-border shadow-inner shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground text-sm md:text-base">
                    {t.name}
                  </span>
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {t.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
