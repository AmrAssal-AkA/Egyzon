"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Trash2, Heart } from "lucide-react";
import {
  useWishlistStore,
  useTopThreeItems,
  useWishlistCount,
  WishlistItem,
} from "@/stores/buyer/wishlist";
import { useCartStore } from "@/stores/buyer/useCart";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface WishlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WishlistModal({
  open,
  onOpenChange,
}: WishlistModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const items = useTopThreeItems();
  const count = useWishlistCount();
  const removeItemFromWishlist = useWishlistStore((state) => state.removeItem);
  const addToCart = useCartStore((state) => state.addToCart);
  const { user } = useAuth();
  
  const handleMoveToCart = (item: WishlistItem) => {
    if (!user) {
      toast.error("Please login to add items to your cart");
      return;
    }
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      description: "",
      thumbnail: item.image || "/images/placeholder.jpg",
    });
    removeItemFromWishlist(item.id);
    toast.success(`Moved "${item.title}" to cart`);
  };

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        // Prevent immediate closing if clicking the toggle button
        const target = e.target as HTMLElement;
        if (target.closest("[data-wishlist-toggle]")) return;
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;

    const focusable = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable && focusable.length > 0) {
      (focusable[0] as HTMLElement).focus();
    }

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleFocusTrap);
    return () => {
      document.removeEventListener("keydown", handleFocusTrap);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wishlist-modal-title"
      className="absolute top-full right-0 mt-3 w-[320px] sm:w-95 bg-popover text-popover-foreground border border-border rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
    >
      {/* Modal Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-border bg-muted/40">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          <h2
            id="wishlist-modal-title"
            className="font-semibold text-sm tracking-tight"
          >
            Wishlist ({count})
          </h2>
        </div>
        <button
          onClick={() => onOpenChange(false)}
          className="text-muted-foreground hover:text-foreground rounded-lg p-1 hover:bg-muted transition-colors cursor-pointer"
          aria-label="Close wishlist preview"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Modal Content */}
      <div className="flex-1 max-h-80 overflow-y-auto px-4 py-2 divide-y divide-border">
        {!user ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Heart className="w-10 h-10 text-muted-foreground/40 mb-3 stroke-[1.5]" />
            <p className="text-sm font-medium text-foreground">
              Please login to view your wishlist
            </p>
            <p className="text-xs text-muted-foreground mt-1 max-w-50">
              You must be logged in to save and view wishlist items.
            </p>
          </div>
        ) : count === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Heart className="w-10 h-10 text-muted-foreground/40 mb-3 stroke-[1.5]" />
            <p className="text-sm font-medium text-foreground">
              Your wishlist is empty
            </p>
            <p className="text-xs text-muted-foreground mt-1 max-w-50">
              Tap the heart icon on any product page to save it here.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center gap-3.5 py-3 group">
              {/* Product Thumbnail */}
              <Link
                href={`/products/${item.id}`}
                onClick={() => onOpenChange(false)}
                className="relative w-14 h-14 rounded-lg overflow-hidden border border-border bg-muted shrink-0 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <Image
                  src={item.image || "/images/placeholder.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </Link>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.id}`}
                  onClick={() => onOpenChange(false)}
                  className="block font-medium text-sm text-foreground hover:text-blue-600 transition-colors truncate focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded"
                >
                  {item.title}
                </Link>
                <span className="block text-xs font-semibold text-foreground mt-1">
                  {item.price.toFixed(2)} EGP
                </span>
              </div>

              {/* Remove Button */}
              <button type="button"
                onClick={() => removeItemFromWishlist(item.id)}
                className="text-muted-foreground hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                aria-label={`Remove ${item.title} from wishlist`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button type="button" onClick={() => handleMoveToCart(item)} className="text-black dark:text-blue-600 cursor-pointer hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors" aria-label={`Move ${item.title} to cart`}>
                Move To Cart
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal Footer */}
      {user && count > 3 && (
        <div className="p-3 border-t border-border bg-muted/40 flex items-center justify-center">
          <Link
            href="/dashboard/wishlist"
            onClick={() => onOpenChange(false)}
            className="w-full py-2 px-4 bg-black dark:bg-white text-white dark:text-black font-semibold text-xs rounded-lg text-center shadow hover:opacity-90 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            View All Wishlist ({count})
          </Link>
        </div>
      )}
    </div>
  );
}
