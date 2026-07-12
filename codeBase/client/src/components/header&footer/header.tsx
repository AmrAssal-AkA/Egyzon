"use client";
import React, { useState } from "react";
import Link from "next/link";

import { IoIosSearch } from "react-icons/io";
import { FiHeart, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

import Model from "./Model";
import NavLinks from "./nav";
import { ModeToggle } from "../ui/ModeToggle";

export default function Header() {
  const [isMenueOpen, setIsMenueOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const toggleMenue = () => {
    setIsMenueOpen(!isMenueOpen);
  };

  const toggleModel = () => {
    setIsModelOpen(!isModelOpen);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-background/95 shadow-md backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="flex items-center justify-between w-full h-20 px-4 md:px-20">
        <div className="flex items-center justify-start">
          <Link
            href="/"
            className="text-4xl font-bold text-foreground"
          >
            Egy<span className="text-blue-600">Zon</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="border border-input rounded-md px-2.5 py-1 w-96 bg-background text-foreground placeholder:text-muted-foreground"
            />
            <button className="bg-blue-600 shadow-md text-white rounded-md px-4 py-2 ml-2 cursor-pointer hover:bg-blue-700 transition-colors duration-300 ease-in-out">
              <IoIosSearch />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2.5">
          <ModeToggle />
          <button className="bg-secondary shadow-md text-secondary-foreground rounded-md px-4 py-2 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out">
            <FiHeart />
          </button>
          <button className="bg-secondary shadow-md text-secondary-foreground rounded-md px-4 py-2 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out">
            <FiShoppingCart />
          </button>
          <div className="relative">
            <button
              onClick={toggleModel}
              className="bg-secondary shadow-md text-secondary-foreground rounded-md px-4 py-2 cursor-pointer hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out"
            >
              <FiUser />
            </button>
            {isModelOpen && <Model onClose={toggleModel} />}
          </div>
          <div className="flex items-center justify-center md:hidden">
            <button onClick={toggleMenue} className="text-foreground text-2xl">
              {isMenueOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      <NavLinks isOpen={isMenueOpen} onLinkClick={toggleMenue} />
    </header>
  );
}
