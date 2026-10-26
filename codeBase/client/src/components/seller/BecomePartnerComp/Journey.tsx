"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { journeySteps } from "../../../types/data";
import { cn } from "@/lib/utils";

export default function Journey() {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <section className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Heading and Timeline */}
        <div className="lg:col-span-6 flex flex-col space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Your journey to success starts here
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl">
              Becoming a seller on Egyzon is simple and straightforward. Follow
              these three steps to begin selling.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative flex flex-col pl-4 md:pl-6 space-y-12">
            {/* Connecting Vertical Line */}
            <div className="absolute left-[30px] md:left-[34px] top-6 bottom-6 w-0.5 bg-border dark:bg-border/30 pointer-events-none" />

            {/* Steps */}
            {journeySteps.map((step) => {
              const isActive = activeStep === step.stepNumber;
              const isCompleted = activeStep > step.stepNumber;

              return (
                <div
                  key={step.stepNumber}
                  className="relative flex gap-6 md:gap-8 items-start cursor-pointer group"
                  onMouseEnter={() => setActiveStep(step.stepNumber)}
                >
                  {/* Circular Number Indicator */}
                  <div
                    className={cn(
                      "flex items-center justify-center size-10 md:size-12 rounded-full border-2 font-bold text-sm md:text-base z-10 transition-all duration-300 shadow-sm shrink-0",
                      isActive
                        ? "bg-blue-600 border-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-950"
                        : isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : "bg-background border-border text-muted-foreground group-hover:border-blue-500 group-hover:text-blue-500",
                    )}
                  >
                    {isCompleted ? (
                      <Check className="size-5 stroke-[3px]" />
                    ) : (
                      step.stepNumber
                    )}
                  </div>

                  {/* Step content */}
                  <div className="flex flex-col space-y-1 mt-1 md:mt-2">
                    <span
                      className={cn(
                        "text-xs font-bold uppercase tracking-wider transition-colors duration-300",
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-muted-foreground",
                      )}
                    >
                      Step {step.stepNumber}
                    </span>
                    <h3
                      className={cn(
                        "text-lg md:text-xl font-bold tracking-tight transition-colors duration-300",
                        isActive
                          ? "text-foreground"
                          : "text-foreground/75 group-hover:text-foreground",
                      )}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "text-sm md:text-base text-muted-foreground transition-all duration-300 max-w-md",
                        isActive
                          ? "opacity-100"
                          : "opacity-75 group-hover:opacity-100",
                      )}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Image aligned with timeline */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-[24px] overflow-hidden border border-border shadow-xl">
            <Image
              src="/images/journey_illustration.jpg"
              alt="E-commerce selling workflow packaging"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              className="object-cover transition-all duration-700 hover:scale-105"
            />
            {/* Visual overlay linked to the step */}
            <div className="absolute inset-0 bg-blue-600/5 dark:bg-blue-400/5 mix-blend-multiply transition-opacity duration-300 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
