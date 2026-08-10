"use client";

import { Percent, Globe, Headphones } from "lucide-react";
import { features } from "../../../types/data";

export default function WhyChoose() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "commission":
        return <Percent className="size-6 text-blue-600 dark:text-blue-400" />;
      case "reach":
        return <Globe className="size-6 text-blue-600 dark:text-blue-400" />;
      case "support":
        return (
          <Headphones className="size-6 text-blue-600 dark:text-blue-400" />
        );
      default:
        return <Percent className="size-6 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-slate-50/50 dark:bg-muted/10">
      <div className="container mx-auto px-4 md:px-20 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Why choose Egyzon?
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to sell online, reach a global audience, and
            grow your revenue in one place.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col text-left p-8 rounded-2xl bg-background border border-border/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              {/* Icon Container */}
              <div className="flex items-center justify-center size-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 mb-6 group-hover:scale-110 transition-transform duration-300">
                {getIcon(feature.icon)}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base flex-grow">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
