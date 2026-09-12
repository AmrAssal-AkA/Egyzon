"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onOpenRegister?: () => void;
}

export default function Hero({ onOpenRegister }: HeroProps) {
  return (
    <section className="relative w-full py-12 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: content */}
        <div className="lg:col-span-6 flex flex-col space-y-6 md:space-y-8 text-left">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Natural & Pen Flag Bal Vendors
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Grow Your Business with <span className="text-blue-600 dark:text-blue-400">Egyzon</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
            Access millions of customers worldwide and leverage our premium logistic network. Start selling in minutes with professional-grade tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              variant="default"
              size="lg"
              onClick={onOpenRegister}
              className="h-12 px-8 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-700/30 transition-all duration-300 w-full sm:w-auto cursor-pointer"
            >
              Join as Seller
            </Button>
          </div>
        </div>

        {/* Right column: image & floating card */}
        <div className="lg:col-span-6 relative w-full flex justify-center lg:justify-end">
          <div className="relative w-full max-w-135 aspect-4/3 md:aspect-4/3 lg:aspect-4/3 rounded-[24px] overflow-hidden border border-border shadow-2xl">
            <Image
              src="/images/seller_hero.jpg"
              alt="Egyzon online seller dashboard workspace"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 540px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Floating analytics card */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-xs bg-background/90 dark:bg-card/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 dark:border-border/30 shadow-xl flex items-center gap-4 transition-all duration-300 hover:translate-y-[-4px]">
              <div className="flex items-center justify-center size-12 rounded-xl bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400">
                <ArrowUpRight className="size-6 font-bold" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
                  Average Growth
                </span>
                <span className="text-xl md:text-2xl font-extrabold text-foreground leading-tight">
                  +45% YoY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
