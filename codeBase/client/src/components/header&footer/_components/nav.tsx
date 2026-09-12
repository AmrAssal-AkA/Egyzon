"use client";
import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { FiHome, FiGrid, FiShoppingBag, FiInfo, FiPhoneCall, FiBriefcase } from "react-icons/fi";

type NavLinksProps = {
  isOpen: boolean;
  onLinkClick: () => void;
};

function NavLinks({ isOpen, onLinkClick }: NavLinksProps) {
  const pathname = usePathname();

  const navLinks = [
    { id: 1, name: "Home", href: "/", icon: <FiHome className="w-4 h-4" aria-hidden="true" /> },
    { id: 2, name: "Products", href: "/products", icon: <FiShoppingBag className="w-4 h-4" aria-hidden="true" /> },
    { id: 3, name: "Categories", href: "/categories", icon: <FiGrid className="w-4 h-4" aria-hidden="true" /> },
    { id: 4, name: "About Us", href: "/about", icon: <FiInfo className="w-4 h-4" aria-hidden="true" /> },
    { id: 5, name: "Contact", href: "/contact", icon: <FiPhoneCall className="w-4 h-4" aria-hidden="true" /> },
    { id: 6, name: "Become a Seller", href: "/Partner", icon: <FiBriefcase className="w-4 h-4" aria-hidden="true" /> },
  ];

  return (
    <>
      {/* Desktop Navigation Bar */}
      <div className="hidden md:block w-full bg-secondary/80 backdrop-blur border-b border-border shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <nav className="flex items-center gap-1 py-2 text-sm font-medium" aria-label="Desktop Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  aria-label={link.name}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold shadow-xs"
                      : "text-secondary-foreground/80 hover:text-blue-600 hover:bg-background/60"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div
          className="fixed inset-0 top-18 z-40 bg-black/40 backdrop-blur-xs md:hidden transition-opacity"
          onClick={onLinkClick}
          aria-hidden="true"
        />
      )}
      <div
        aria-hidden={!isOpen}
        inert={!isOpen}
        className={`absolute top-full left-0 w-full bg-background border-b border-border shadow-xl z-50 md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible pointer-events-none"
        }`}
      >
        <div className="px-4 py-4 space-y-3 max-h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={onLinkClick}
                  aria-label={link.name}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}

export default NavLinks;

