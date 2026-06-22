"use client";

import React, { useState, useRef, useEffect } from "react";

export default function Dropdown({ trigger, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const HandleMenuOpen = () => {
    setIsOpen(true);
  };
  const HandleMenuClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div onClick={HandleMenuOpen}>{trigger}</div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-0" onClick={HandleMenuClose} />
          <div
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-xl bg-white z-10 dark:bg-gray-700 dark:border dark:border-gray-600"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="py-1">{children}</div>
          </div>
        </>
      )}
    </div>
  );
}
