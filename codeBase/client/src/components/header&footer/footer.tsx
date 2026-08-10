"use client";

import Link from "next/link";
import React from "react";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiSend,
  FiChevronRight,
  FiShield,
  FiTruck,
  FiCreditCard,
  FiHeadphones,
} from "react-icons/fi";

export default function Footer() {
  const navLinks = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Products", href: "/products" },
    { id: 3, name: "Categories", href: "/categories" },
    { id: 4, name: "About Us", href: "/about" },
    { id: 5, name: "Contact", href: "/contact" },
  ];

  const partnerLinks = [
    { id: 1, name: "Become a Seller", href: "/Partner" },
    { id: 2, name: "Partner Program", href: "/Partner#program" },
    { id: 3, name: "Seller Hub", href: "/Partner#hub" },
    { id: 4, name: "Vendor Support", href: "/contact" },
  ];

  const socialLinks = [
    { id: 1, icon: <FiFacebook className="w-4 h-4" />, href: "https://facebook.com", label: "Facebook" },
    { id: 2, icon: <FiTwitter className="w-4 h-4" />, href: "https://twitter.com", label: "Twitter" },
    { id: 3, icon: <FiInstagram className="w-4 h-4" />, href: "https://instagram.com", label: "Instagram" },
    { id: 4, icon: <FiLinkedin className="w-4 h-4" />, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  const trustHighlights = [
    {
      id: 1,
      icon: <FiTruck className="w-5 h-5 text-blue-400 shrink-0" />,
      title: "Nationwide Shipping",
      desc: "Fast delivery across Egypt",
    },
    {
      id: 2,
      icon: <FiShield className="w-5 h-5 text-blue-400 shrink-0" />,
      title: "Buyer Escrow Protection",
      desc: "100% verified transactions",
    },
    {
      id: 3,
      icon: <FiCreditCard className="w-5 h-5 text-blue-400 shrink-0" />,
      title: "Flexible Payments",
      desc: "Cards & Cash on Delivery",
    },
    {
      id: 4,
      icon: <FiHeadphones className="w-5 h-5 text-blue-400 shrink-0" />,
      title: "Dedicated Support",
      desc: "24/7 Assistance available",
    },
  ];

  return (
    <footer className="w-full bg-[#0b1329] dark:bg-[#060c18] text-slate-300 border-t border-white/10 transition-colors duration-300">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-20">
        
        {/* Trust Highlights Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 mb-12 border-b border-white/10">
          {trustHighlights.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/3 border border-white/6 hover:bg-white/6 transition-all duration-200"
            >
              {item.icon}
              <div className="min-w-0">
                <h5 className="text-xs sm:text-sm font-semibold text-white truncate">{item.title}</h5>
                <p className="text-xs text-slate-400 truncate">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Links & Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Brand & About Column */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-4 space-y-4 sm:space-y-5">
            <Link
              href="/"
              className="inline-block text-3xl font-extrabold tracking-tight text-white hover:opacity-90 transition-opacity"
            >
              Egyzon<span className="text-blue-500">.</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Egyzon is Egypt&apos;s next-generation multi-vendor marketplace connecting customers with trusted local and global sellers. Discover quality products with fast shipping and secure payments.
            </p>
            {/* Social Links */}
            <div className="pt-1 flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Marketplace
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    <FiChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner Links Column */}
          <div className="sm:col-span-1 md:col-span-2 lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Partner With Us
            </h4>
            <ul className="space-y-2.5">
              {partnerLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    <FiChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">
              Newsletter
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-400">
              Subscribe to receive updates on exclusive deals, new arrivals, and special promotions.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3 pt-1">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all flex-1"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all duration-200 shadow-md shadow-blue-600/20 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Subscribe</span>
                  <FiSend className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                We value your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>

        </div>

        {/* Footer Bottom Section */}
        <div className="mt-12 lg:mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-xs text-slate-400 text-center md:text-left">
          <p>© {new Date().getFullYear()} Egyzon Marketplace. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-blue-400 transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-blue-400 transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:text-blue-400 transition-colors duration-200">
              Cookie Settings
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}


