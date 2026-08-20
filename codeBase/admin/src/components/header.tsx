import React from 'react'
import { LogOut, UserCircleIcon, Bell } from "lucide-react";

import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { admin, logout } = useAuth();
  const displayName = admin
    ? `${admin.FirstName} ${admin.LastName}`.trim() || admin.email
    : "Admin";

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="flex items-end justify-end mb-4 p-4 bg-gray-100 shadow-md overflow-clip">
      <div className="relative mr-4">
        <Bell className="cursor-pointer" />
      </div>
      <div className="flex items-center gap-3">
        <UserCircleIcon className="cursor-pointer" />
        <p className="text-sm text-gray-600">Welcome, {displayName}</p>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </header>
  )
}
