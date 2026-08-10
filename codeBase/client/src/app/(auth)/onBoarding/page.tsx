import React, { Suspense } from "react";
import OnboardingContent from "@/components/auth/OnboardingContent";
import { Spinner } from "@/components/ui/spinner";


export const metadata = {
  title: "Egyzon - Onboarding",
  description: "Welcome to Egyzon, your one-stop destination for a wide range of products.",
}


export default function OnBoardingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
          <Spinner className="w-8 h-8 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Loading onboarding...</h3>
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}