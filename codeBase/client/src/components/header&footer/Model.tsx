import React from "react";
import Link from "next/link";

import { FiX } from "react-icons/fi";

export default function Model({ onClose } : { onClose: () => void }) {
  const link = [
    { id: 1, name: "login", href: "/login" },
    { id: 2, name: "register", href: "/Register" },
  ];
  return (
    <div className="absolute top-full right-0 mt-2 bg-popover text-popover-foreground p-4 rounded-lg shadow-lg w-48 flex flex-col z-50 border border-border">
      {" "}
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Account</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors duration-300 ease-in-out cursor-pointer"
        >
          <FiX size={20} />
        </button>
        <div className="flex flex-col space-y-2">
          {link.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-popover-foreground px-4 py-2 hover:text-blue-600 transition-colors duration-300 ease-in-out block text-center border border-border rounded-md"
              onClick={onClose}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
