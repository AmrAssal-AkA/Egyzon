"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import { FiUser, FiMenu, FiX, FiSearch } from "react-icons/fi";

import Model from "./_components/Model";
import NavLinks from "./_components/nav";
import { ModeToggle } from "../ui/ModeToggle";
import WishlistIcon from "@/components/wishlist/WishlistIcon";
import CartModel from "./_components/CartModel";
import { useAuth } from "@/hooks/useAuth";
import SearchBarComponent from "./_components/searchBar";

export default function Header() {
  const [isMenueOpen, setIsMenueOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { isSeller } = useAuth();

  const toggleMenue = () => {
    setIsMenueOpen(!isMenueOpen);
    if (isMobileSearchOpen) setIsMobileSearchOpen(false);
  };

  const toggleModel = () => {
    setIsModelOpen(!isModelOpen);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (isMenueOpen) setIsMenueOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background/95 border-b border-border shadow-xs backdrop-blur supports-backdrop-filter:bg-background/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          {/* Logo & Brand */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground hover:opacity-90 transition-opacity flex items-center gap-0.5"
            >
              <span>Egy</span>
              <span className="text-blue-600">Zon</span>
            </Link>
          </div>

            <Suspense
              fallback={
                <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg h-9 rounded-full bg-muted/30" />
              }
            >
              <SearchBarComponent />
            </Suspense>
          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Mobile Search Toggle */}
            <button
              onClick={toggleMobileSearch}
              aria-label="Toggle search"
              className="md:hidden p-2 text-foreground/80 hover:text-blue-600 hover:bg-muted rounded-xl transition-colors"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            <ModeToggle />
            {!isSeller && (
              <>
                <WishlistIcon />
                <CartModel />
              </>
            )}

            {/* User Account Button */}
            <div className="relative">
              <button
                onClick={toggleModel}
                aria-label="User Account"
                className="p-2 sm:p-2.5 bg-secondary hover:bg-blue-600 text-secondary-foreground hover:text-white rounded-xl transition-all duration-200 cursor-pointer shadow-2xs flex items-center justify-center"
              >
                <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              {isModelOpen && <Model onClose={toggleModel} />}
            </div>

            {/* Mobile Menu Hamburger Toggle */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenue}
                aria-label="Toggle menu"
                className="p-2 text-foreground hover:text-blue-600 hover:bg-muted rounded-xl transition-colors text-xl"
              >
                {isMenueOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Expandable Search Bar */}
        {isMobileSearchOpen && (
          <div className="md:hidden pb-3 pt-1 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-200">
            <Suspense fallback={<div className="w-full h-9 rounded-full bg-muted/30" />}>
              <SearchBarComponent
                isMobile
                onClose={() => setIsMobileSearchOpen(false)}
                autoFocus
              />
            </Suspense>
          </div>
        )}
      </div>

      {/* Navigation Sub-header */}
      <NavLinks isOpen={isMenueOpen} onLinkClick={toggleMenue} />
    </header>
  );
}
