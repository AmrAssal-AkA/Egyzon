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
  Search,
} from "lucide-react";
import Dropdown from "./dropdown";

import Logo from "@/public/Logo/EgyzonLogo.png";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import ToggleTheme from "./ToggleTheme";

const categoryLinks = [
  { name: "Products", path: "/products" },
  { name: "Deals", path: "/Deals" },
  { name: "Best Sellers", path: "/bestseller" },
  { name: "New Arrivals", path: "/newArrival" },
  { name: "Electronics", path: `/categories/electronics` },
  { name: "Fashion", path: `/categories/fashion` },
  { name: "Home & Kitchen", path: `/categories/home-kitchen` },
  { name: "More...", path: "/categories" },
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
    <nav className="w-full fixed top-0 left-0 z-50 bg-yellow-400 shadow-sm border-b border-yellow-500/50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex justify-between items-center h-20 gap-4 md:gap-8">
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

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-3xl">
            <div className="flex w-full shadow-sm">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-l-md border-none focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900 bg-white dark:bg-gray-700 dark:text-white dark:focus:ring-yellow-400 dark:placeholder:text-gray-400 placeholder:text-gray-500 transition-colors"
              />
              <button
                type="button"
                className="bg-gray-900 text-yellow-400 px-5 py-2 rounded-r-md font-bold hover:bg-gray-950 dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-600 transition-colors flex items-center justify-center"
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Right Actions Section */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Cart Icon */}
            <Link href={"/cart"} className="inline-block">
              <button
                onClick={openCart}
                className="relative p-2.5 text-black bg-yellow-500/20 hover:bg-yellow-500/50 rounded-full transition-colors flex items-center justify-center cursor-pointer dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600"
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
            <div className="hidden md:flex items-center gap-3 sm:gap-5">
              <Dropdown
                trigger={
                  <button className="flex items-center gap-2 p-2 px-3 text-black bg-yellow-500/20 hover:bg-yellow-500/50 rounded-full transition-colors font-semibold cursor-pointer dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600">
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
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-yellow-50 hover:text-black transition-colors dark:text-white dark:hover:bg-gray-600"
                        role="menuitem"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <form action={logout} className="w-full">
                        <button
                          type="submit"
                          className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors dark:text-red-400 dark:hover:bg-gray-600"
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
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-yellow-50 hover:text-black transition-colors dark:text-white dark:hover:bg-gray-600"
                        role="menuitem"
                      >
                        <LogIn className="w-4 h-4" />
                        <span>Login</span>
                      </Link>
                      <Link
                        href="/signup"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-yellow-50 hover:text-black transition-colors dark:text-white dark:hover:bg-gray-600"
                        role="menuitem"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Sign Up</span>
                      </Link>
                    </>
                  )}
                </div>
              </Dropdown>
              <ToggleTheme />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setOpen(!Open)}
              className="md:hidden p-2 text-black bg-yellow-500/20 hover:bg-yellow-500/50 rounded-full transition-colors flex items-center justify-center focus:outline-none dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600"
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

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3 px-4 sm:px-6">
          <div className="flex w-full shadow-sm">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-l-md border-none focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900 bg-white dark:bg-gray-700 dark:text-white dark:focus:ring-yellow-400 dark:placeholder:text-gray-400 placeholder:text-gray-500 transition-colors"
            />
            <button
              type="button"
              className="bg-gray-900 text-yellow-400 px-4 py-2 rounded-r-md font-bold hover:bg-gray-950 transition-colors flex items-center justify-center dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-600"
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-yellow-400/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          Open ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-4 pt-4 pb-8 gap-4">
          {user ? (
            <div className="flex items-center gap-3 border-b border-yellow-500/50 dark:border-gray-700 pb-4">
              <CircleUserRound
                size={40}
                className="text-black dark:text-white"
              />
              <div>
                <p className="font-bold text-black dark:text-white">
                  {user.name}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 border-b border-yellow-500/50 dark:border-gray-700 pb-4">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-black text-yellow-400 rounded-md font-semibold transition-colors hover:bg-gray-800 dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-600"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white text-black rounded-md font-semibold transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                <UserPlus size={18} />
                <span>Sign Up</span>
              </Link>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="font-semibold text-black dark:text-white">
              Appearance
            </span>
            <ToggleTheme />
          </div>

          {user && (
            <>
              <Link
                href="/profile/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-2 text-black dark:text-white font-medium"
              >
                <Settings size={20} />
                <span>Settings</span>
              </Link>
              <form action={logout} className="w-full">
                <button
                  type="submit"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center gap-3 py-2 text-red-600 dark:text-red-400 font-medium"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="hidden md:block bg-yellow-500 border-t border-yellow-600/30 dark:bg-gray-700 dark:border-gray-600/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <ul className="flex items-center gap-6 overflow-x-auto py-2.5 text-sm font-semibold text-yellow-950 dark:text-yellow-50 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categoryLinks.map((link) => (
              <li key={link.name} className="whitespace-nowrap shrink-0">
                <Link
                  href={link.path}
                  className={`py-1.5 px-2 rounded-md transition-colors ${
                    currentPath === link.path
                      ? "bg-black text-yellow-400 dark:bg-yellow-400 dark:text-black"
                      : "hover:bg-black/10 dark:hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
