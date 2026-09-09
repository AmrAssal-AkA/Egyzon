import React, { Suspense } from "react";

import WishlistComponentPage from "@/components/wishlist/wishlistCardPage";
import { Spinner } from "@/components/ui/spinner";

export default function WishlistPage() {
  return (
    <div className="flex min-h-screen w-full">
      <main className="flex-1 bg-background flex flex-col items-center px-4 md:px-12">
        <Suspense
          fallback={
            <div className="w-full min-h-[60vh] flex items-center justify-center">
              <Spinner className="h-8 w-8 text-primary" />
            </div>
          }
        >
          <WishlistComponentPage />
        </Suspense>
      </main>
    </div>
  );
}

