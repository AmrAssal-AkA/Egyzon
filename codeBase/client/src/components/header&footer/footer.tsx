import Link from "next/link";
import React from "react";

import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

export default function Footer() {
  const navLinks = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Products", href: "/products" },
    { id: 3, name: "categories", href: "/categories" },
    { id: 4, name: "About", href: "/about" },
    { id: 5, name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { id: 1, icon: <FiFacebook />, href: "/" },
    { id: 2, icon: <FiTwitter />, href: "/" },
    { id: 3, icon: <FiInstagram />, href: "/" },
  ];

  const partnerLinks = [
    { id: 1, name: "Become a Seller", href: "/become-a-seller" },
  ];
  return (
    <footer className="bg-secondary text-secondary-foreground py-8 border-t border-border">
      <div className="container mx-auto px-4 md:px-20">
        {/* Footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-4">
            {/* Logo and tagline */}
            <h2 className="text-4xl font-bold">Egyzon</h2>
            <p className="mt-2 text-muted-foreground max-w-md">
              Egyzon is a next-generation multi-vendor e-commerce marketplace
              designed to connect customers with trusted businesses across
              Egypt. From everyday essentials to premium brands, we make
              discovering, comparing, and purchasing products effortless through
              a secure, fast, and customer-focused shopping experience. Whether
              you&apos;re a shopper looking for quality or a seller ready to grow
              your business, Egyzon provides the platform to connect, thrive,
              and succeed.{" "}
            </p>
            <div className="mt-4 flex items-center">
                {/* Social media links */}
              {socialLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-muted-foreground hover:text-blue-600 transition-colors duration-300 ease-in-out mr-4"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          {/* Navigation links */}
          <div className="md:col-span-1 space-x-0 md:space-y-2">
            <h4 className="text-lg font-semibold mb-4">MarketPlace</h4>
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-muted-foreground hover:text-blue-600 transition-colors duration-300 ease-in-out md:block sm:space-x-4 ml-2"
              >
                {link.name}
              </Link>
            ))}
          </div>
          {/* Partner with us links */}
          <div className="md:col-span-1 mt-4 md:mt-0">
            <h4 className="text-lg font-semibold mb-4">partner with us</h4>
            {partnerLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-muted-foreground hover:text-blue-600 transition-colors duration-300 ease-in-out md:block sm:space-x-4 ml-2"
              >
                {link.name}
              </Link>
            ))}
          </div>
            {/* Newsletter subscription form */}
          <div className="md:col-span-1 mt-4">
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <form className="flex flex-col md:flex-row items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-input rounded-md px-4 py-2 w-full md:w-auto mb-2 md:mb-0 md:mr-2 bg-background text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition-colors duration-300 ease-in-out cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        {/* Footer bottom section */}
        <div className="mt-8 text-center text-muted-foreground border-t border-border pt-4">
          &copy; {new Date().getFullYear()} Egyzon. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
