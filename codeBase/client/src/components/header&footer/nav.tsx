"use client";
import React from "react";
import Link from "next/link";

type NavLinksProps = {
  isOpen: boolean;
  onLinkClick: () => void;
};

function NavLinks({ isOpen, onLinkClick }: NavLinksProps) {
  const navLinks = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Products", href: "/products" },
    { id: 3, name: "categories", href: "/categories" },
  ];
  return (
    <>
      <div className="hidden md:block w-full shadow-md z-50 bg-secondary border-b border-blue-600">
        <nav className="flex flex-row  gap-4 p-4 ml-10">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-secondary-foreground px-4 py-2 hover:text-blue-600 transition-colors duration-300 ease-in-out hover:border-b-2 hover:border-blue-600"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      <div
        className={`absolute top-20 left-0 w-full bg-background shadow-md z-50 md:hidden ${isOpen ? "block" : "hidden"}`}
      >
        <nav className="flex flex-col gap-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-foreground px-4 py-2 hover:text-blue-600 transition-colors duration-300 ease-in-out hover:border-b-2 hover:border-blue-600"
              onClick={onLinkClick}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default NavLinks;
