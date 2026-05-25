"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  CircleUserRound,
  LogIn,
  UserPlus,
  LogOut,
  Settings,
} from "lucide-react";
import Dropdown from "./dropdown";

import Logo from "@/public/Logo/EgyzonLogo.png";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";

export const navlinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Deals", path: "/Deals" },
  { name: "Become a Partner", path: "/Partner" },
];

export default function Mainheader({ user }) {
  const currentPath = usePathname();

  const { openCart, cartItems } = useCart();
  const totalquantity = cartItems.reduce(
    (Quantity, item) => Quantity + item.quantity,
    0,
  );

  const [Open, setOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-yellow-400 shadow-sm border-b border-yellow-500/50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Image
                src={Logo}
                alt="Egyzon Brand Logo"
                width={110}
                priority
                className="drop-shadow-sm"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8 md:flex-1 md:justify-center">
            {navlinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`relative text-base font-semibold transition-colors duration-200 py-2 group ${
                  currentPath === link.path
                    ? "text-yellow-900"
                    : "text-black hover:text-yellow-800"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-900 transform origin-left transition-transform duration-300 ease-out ${
                    currentPath === link.path
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Right Actions Section */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Cart Icon */}
            <Link href={"/cart"} className="inline-block">
              <button
                onClick={openCart}
                className="relative p-2.5 text-black bg-yellow-500/20 hover:bg-yellow-500/50 rounded-full transition-colors flex items-center justify-center"
                aria-label="Open cart"
              >
                <ShoppingCart size={22} strokeWidth={2.5} />
                {totalquantity > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-yellow-900 text-yellow-50 text-[11px] rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center font-bold shadow-sm border-2 border-yellow-400">
                    {totalquantity > 99 ? "99+" : totalquantity}
                  </span>
                )}
              </button>
            </Link>

            {/* Account Dropdown (Desktop) */}
            <div className="hidden md:block">
              <Dropdown
                trigger={
                  <button className="flex items-center gap-2 p-2 px-3 text-black bg-yellow-500/20 hover:bg-yellow-500/50 rounded-full transition-colors font-semibold">
                    <CircleUserRound size={22} strokeWidth={2.5} />
                    {user && (
                      <span className="truncate max-w-[120px] text-sm">
                        {user.name}
                      </span>
                    )}
                  </button>
                }
              >
                <div className="min-w-[180px] flex flex-col py-1">
                  {user ? (
                    <>
                      <Link
                        href="/profile/settings"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-yellow-50 hover:text-black transition-colors"
                        role="menuitem"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <form action={logout} className="w-full">
                        <button
                          type="submit"
                          className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                          role="menuitem"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </form>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-yellow-50 hover:text-black transition-colors"
                        role="menuitem"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                      </Link>
                      <Link
                        href="/signup"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-yellow-50 hover:text-black transition-colors"
                        role="menuitem"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Sign Up</span>
                      </Link>
                    </>
                  )}
                </div>
              </Dropdown>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setOpen(!Open)}
              className="md:hidden p-2 text-black bg-yellow-500/20 hover:bg-yellow-500/50 rounded-full transition-colors flex items-center justify-center focus:outline-none"
              aria-label="Toggle navigation"
            >
              {Open ? (
                <X size={24} strokeWidth={2.5} />
              ) : (
                <Menu size={24} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-yellow-400 border-t border-yellow-500/30 shadow-inner ${
          Open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 pt-4 pb-6 space-y-2">
          {navlinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-bold transition-colors ${
                  currentPath === link.path
                    ? "bg-yellow-500/40 text-yellow-950"
                    : "text-black hover:bg-yellow-500/20"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* Mobile Account Actions */}
          <li className="pt-4 mt-2 border-t border-yellow-500/30">
            <div className="px-4 pb-3 text-xs font-bold text-yellow-800 uppercase tracking-wider">
              Account
            </div>
            {user ? (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/profile/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-black hover:bg-yellow-500/20 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </Link>
                <form action={logout} className="w-full">
                  <button
                    type="submit"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-red-700 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-black hover:bg-yellow-500/20 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-black hover:bg-yellow-500/20 transition-colors"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
