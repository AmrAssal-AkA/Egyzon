"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import { FiHeart } from "react-icons/fi";
import { useWishlistCount, useWishlistStore } from "@/stores/buyer/wishlist";
import WishlistModal from "./WishlistModal";
import { useAuth } from "@/hooks/useAuth";

export default function WishlistIcon() {
  const [open, setOpen] = React.useState(false);
  const count = useWishlistCount();
  const loadWishlist = useWishlistStore((state) => state.loadWishlist);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const { user } = useAuth();
  
  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const displayCount = mounted && user ? count : 0;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        data-wishlist-toggle
        className="relative bg-secondary shadow-md text-secondary-foreground rounded-md px-4 py-2 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        aria-label={`Wishlist, ${displayCount} items`}
        title={`Wishlist (${displayCount})`}
      >
        <FiHeart className="w-4.5 h-4.5 transition-transform duration-300 group-hover:scale-110" />

        {displayCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border border-background shadow-sm animate-in zoom-in duration-300">
            {displayCount}
          </span>
        )}
      </button>

      {/* Render Wishlist Modal */}
      {mounted && <WishlistModal open={open} onOpenChange={setOpen} />}
    </div>
  );
}
