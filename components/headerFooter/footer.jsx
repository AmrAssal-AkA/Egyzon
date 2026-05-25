"use client";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

import Logo from "@/public/Logo/EgyzonLogo.png";


export function Footer() {
  const FooterLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Deals", path: "/Deals" },
    { name: "Become a Partner", path: "/Partner" },
  ]

  const links = FooterLinks;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-yellow-400 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center md:items-start">
          {/* Brand & Social Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src={Logo}
                width={120}
                alt="Egyzon Brand Logo"
                className="drop-shadow-sm"
              />
            </Link>
            <p className="text-sm font-medium text-center md:text-left max-w-xs text-yellow-900/80 dark:text-gray-300">
              Experience shopping like never before! Discover the best products,
              deals, and partnerships all in one place.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link
                href="#"
                aria-label="Facebook"
                className="p-2 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors text-black dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="p-2 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors text-black dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <Twitter size={18} />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="p-2 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors text-black dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <Instagram size={18} />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-center">
            <h3 className="font-bold text-lg mb-4 text-black uppercase tracking-wider dark:text-white">
              Quick Links
            </h3>
            <ul className="flex flex-col space-y-3 text-center md:text-left">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="font-semibold text-gray-800 hover:text-black hover:underline underline-offset-4 decoration-2 decoration-black/50 transition-all duration-300 dark:text-white dark:hover:text-yellow-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col items-center md:items-start w-full">
            <h3 className="font-bold text-lg mb-4 text-black uppercase tracking-wider dark:text-white">
              Stay in the loop
            </h3>
            <p className="text-sm text-yellow-900/80 text-center md:text-left mb-4 dark:text-gray-300">
              Subscribe to our newsletter for the latest deals and products.
            </p>
            <form
              className="flex w-full max-w-sm shadow-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-md border-none focus:outline-none focus:ring-2 focus:ring-black text-black dark:text-white dark:bg-gray-700 dark:focus:ring-gray-600"
              />
              <button
                type="submit"
                className="bg-black text-yellow-400 px-4 py-2 rounded-r-md font-bold hover:bg-gray-800 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Area */}
      <div className="border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-semibold text-yellow-900/80 text-center md:text-left dark:text-gray-300">
            &copy; {currentYear} Designed By AmrAssal. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-semibold text-yellow-900/80 dark:text-gray-300">
            <Link href="#" className="hover:text-black transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-black transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
