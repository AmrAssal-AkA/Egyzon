"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Dropdown({ trigger, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={toggleDropdown}>{trigger}</div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none" onClick={() => setIsOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
