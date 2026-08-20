import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Package,
  PoundSterling,
  Settings,
  LogOut,
  UserCircleIcon
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function SideBarMenu() {
  const menuItems = [
    { id: 1, label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { id: 2, label: "Users", path: "/users", icon: Users },
    {
      id: 3,
      label: "Seller Management",
      path: "/sellerManagement",
      icon: Package,
    },
    { id: 4, label: "Financial", path: "/financial", icon: PoundSterling },
    { id: 5, label: "Settings", path: "/settings", icon: Settings },
  ];
  const {admin, logout } = useAuth();

  const displayName = admin
    ? `${admin.FirstName} ${admin.LastName}`.trim() || admin.email
    : "Admin";

  const handleLogout = () => {
    logout();
  };
  return (
    <aside className="w-72 bg-gray-900 text-white min-h-screen p-4 overflow-y-auto shrink-0 flex flex-col antialiased border-r border-gray-700/80 shadow-lg">
      <div className="flex items-center justify-center h-16 border-b border-gray-700/80 mb-4">
        <h1 className="text-lg font-semibold text-center tracking-tight leading-snug text-gray-50">
          Egyzon Management center
        </h1>
      </div>
      <div className="flex-grow">
        <nav className="space-y-0.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg mb-1 border-l-2 transition-all duration-200 ${
                  isActive
                    ? "bg-gray-800 text-white font-medium border-l-white shadow-sm ring-1 ring-inset ring-gray-700/50"
                    : "text-gray-400 border-l-transparent hover:bg-gray-800/70 hover:text-white hover:border-l-gray-500"
                }`
              }
            >
              {item.icon &&
                (() => {
                  const Icon = item.icon as unknown as React.ComponentType<any>;
                  return <Icon className="w-5 h-5 mr-3 shrink-0 opacity-90" />;
                })()}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      {/* User Profile Info */}
      <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-4 bg-gray-800/50">
        <UserCircleIcon className="w-5 h-5 shrink-0 text-gray-300" />
        <p className="text-sm text-gray-200 font-medium truncate">{displayName}</p>
      </div>
      <button
        className="flex items-center w-full p-2.5 rounded-lg mt-auto pt-4 border-t border-gray-700/80 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5 mr-3 shrink-0" />
        Logout
      </button>
    
    </aside>
  );
}
