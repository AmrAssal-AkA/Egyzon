"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, CircleUserRound } from "lucide-react";

import Logo from "@/public/Logo/EgyzonLogo.png";
import { useCart } from "../context/CartContext";

export const navlinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Deals", path: "/Deals" },
  { name: "Become a Partner", path: "/" },
];

export default function Mainheader() {
  const { openCart, cartItems } = useCart();
  const totalquantity = cartItems.reduce(
    (Quantity, item) => Quantity + item.quantity,
    0
  );

  const [Open, setOpen] = useState(false);
  return (
    <nav className="shadow-md w-full fixed top-0 left-0 ">
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
              <Link href={links.path} className="active:text-yellow-600 ">
                {links.name}
              </Link>
            </li>
          ))}

          <button className="p-4 py-3  md:ml-8  cursor-pointer duration-200">
            <CircleUserRound className="w-6 h-6" />
          </button>
          <Link href="/cart">
            <button
              className="md:ml-10 cursor-pointer relative inline-block"
              onClick={openCart}
              aria-label="open cart"
            >
              <ShoppingCart size={25} />
              {totalquantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {totalquantity}
                </span>
              )}
            </button>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
