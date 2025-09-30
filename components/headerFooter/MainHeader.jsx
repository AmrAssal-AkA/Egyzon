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
    0
  );

  const [Open, setOpen] = useState(false);
  return (
    <nav className="shadow-md w-full fixed top-0 left-0 z-20">
      <div className="md:flex items-center justify-between bg-yellow-400 py-4 md:px-10 px-7">
        <div className="cursor-pointer flex items-center">
          <Link href="/">
            <Image src={Logo} alt="egyzon Brand logo" width={100} />
          </Link>
        </div>
        <button
          onClick={() => setOpen(!Open)}
          className="absolute right-8 top-8 cursor-pointer md:hidden"
        >
          {Open ? <X /> : <Menu />}
        </button>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-yellow-400 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${Open ? "top-30 opacity-100" : "top-[-498px]"} md:opecity-100 opecity-0 `}
        >
          {navlinks.map((links) => (
            <li
              key={links.name}
              className="md:ml-8 text-xl md:my-0 my-7  md:p-8"
            >
              <Link
                href={links.path}
                className={
                  currentPath === links.path
                    ? "border-2 p-2 text-yellow-800 font-bold"
                    : "text-black"
                }
              >
                {links.name}
              </Link>
            </li>
          ))}

          <div className="md:ml-8">
            <Link href={"/cart"}>
              <button
                onClick={openCart}
                className="p-4 py-3 md:ml-4 cursor-pointer relative inline-block"
                aria-label="open cart"
              >
                <ShoppingCart size={25} />
                {totalquantity > 0 && (
                  <span className="absolute top-2 right-2 bg-yellow-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {totalquantity}
                  </span>
                )}
              </button>
            </Link>
            <Dropdown
              trigger={
                <button className="p-4 py-3 cursor-pointer duration-200 flex items-center gap-2">
                  <CircleUserRound className="w-6 h-6" />
                  {user && (
                    <span className="hidden md:inline">{user.name}</span>
                  )}
                </button>
              }
            >
              {user ? (
                <>
                  <Link
                    href="/profile/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <form action={logout} className="w-full">
                    <button
                      type="submit"
                      className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/signup"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </Dropdown>
          </div>
        </ul>
      </div>
    </nav>
  );
}
