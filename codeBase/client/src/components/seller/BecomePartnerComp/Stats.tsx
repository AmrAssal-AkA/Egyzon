"use client";

import { statistics } from "../../../types/data";

export default function Stats() {
  return (
    <section className="w-full bg-[#0b1329] dark:bg-[#060c18] py-12 md:py-16 text-white border-y border-white/5">
      <div className="container mx-auto px-4 md:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center p-4 transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
                {stat.value}
              </span>
              <span className="text-sm md:text-base font-medium text-slate-400 tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
