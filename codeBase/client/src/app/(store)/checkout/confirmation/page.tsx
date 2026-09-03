import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import CheckoutConfirmationClientPage from "@/components/checkout/checkoutConfimationClientPage";

export default function ConfirmationPage() {
  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center py-20 px-4 md:px-20 mt-2.5">
      <Suspense
        fallback={
          <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Loading order confirmation...
            </p>
          </div>
        }
      >
        <CheckoutConfirmationClientPage />
      </Suspense>
    </main>
  );
}
