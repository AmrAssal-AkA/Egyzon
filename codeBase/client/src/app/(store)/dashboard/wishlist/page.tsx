import React from "react";

import WishlistComponentPage from "@/components/wishlist/wishlistCardPage";

export default function WishlistPage() {
  return (
    <div className="flex min-h-screen w-full">
      <main className="flex-1 bg-background flex flex-col items-center px-4 md:px-12">
        <WishlistComponentPage />
      </main>
    </div>
  );
}
