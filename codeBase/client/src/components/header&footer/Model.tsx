"use client";

import React from "react";
import Link from "next/link";

import { FiX } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";


interface AccountLink {
  id: number;
  name: string;
  href: string;
  requiresAuth: boolean;
  requiresIncompleteOnboarding?: boolean;
}

const allAccountLinks: AccountLink[] = [
  { id: 1, name: "Complete Your Profile", href: "/onBoarding", requiresAuth: true, requiresIncompleteOnboarding: true },
  { id: 2, name: "Profile", href: "/dashboard", requiresAuth: true },
  { id: 3, name: "My Orders", href: "/orders", requiresAuth: true },
  { id: 4, name: "Login", href: "/login", requiresAuth: false },
  { id: 5, name: "Register", href: "/Register", requiresAuth: false },
];

export default function Model({ onClose }: { onClose: () => void }) {
  const { user, logout } = useAuth();

  const isCompleted =
    user?.isCompleted === true ||
    (user as any)?.isOnboarded === true ||
    Boolean(user?.address && user?.phoneNumber);

  const displayedLinks = allAccountLinks.filter((link) => {
    if (user) {
      if (!link.requiresAuth) return false;
      if (link.requiresIncompleteOnboarding && isCompleted) return false;
      return true;
    } else {
      return !link.requiresAuth;
    }
  });

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="absolute top-full right-0 mt-2 bg-popover text-popover-foreground p-4 rounded-lg shadow-lg w-48 flex flex-col z-50 border border-border">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Account</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors duration-300 ease-in-out cursor-pointer"
        >
          <FiX size={20} />
        </button>
        <div className="flex flex-col space-y-2">
          {displayedLinks.map((accountLink) => (
            <Link
              key={accountLink.id}
              href={accountLink.href}
              onClick={onClose}
              className="text-popover-foreground px-4 py-2 hover:text-blue-600 transition-colors duration-300 ease-in-out block text-center border border-border rounded-md"
            >
              {accountLink.name}
            </Link>
          ))}
          {user && (
            <button
              onClick={handleLogout}
              className="text-red-600 px-4 py-2 hover:text-blue-600 transition-colors duration-300 ease-in-out block text-center border border-border rounded-md cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
