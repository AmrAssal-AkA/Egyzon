"use client";

import Button from "../../ui/button";

interface CTAProps {
  onOpenRegister?: () => void;
}

export default function CTA({ onOpenRegister }: CTAProps) {
  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden bg-[#090d16] text-white">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-1/2 left-1/4 size-125 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute -bottom-1/2 right-1/4 size-125 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-20 relative z-10 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Ready to transform your business?
          </h2>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
            Join the world&apos;s most curated marketplace and start your global
            selling journey today.
          </p>

          <div className="pt-4">
            <Button
              variant="default"
              size="lg"
              onClick={onOpenRegister}
              className="h-14 px-10 text-base md:text-lg font-bold shadow-xl shadow-blue-600/35 hover:shadow-blue-700/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 w-full sm:w-auto cursor-pointer"
            >
              Join as Seller
            </Button>
          </div>

          {/* Sub-text badges / Trust badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-4 text-xs md:text-sm font-semibold tracking-wide uppercase text-slate-400">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-blue-500" />
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-blue-500" />
              No hidden costs
            </div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-blue-500" />
              Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
