import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Package,
  PoundSterling,
  Settings,
  LogOut
} from "lucide-react";

export default function SideBarMenu() {
  const menuItems = [
    { id: 1, label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { id: 2, label: "Users", path: "/users", icon: Users },
    { id: 3, label: "Products", path: "/products", icon: Package },
    { id: 4, label: "Financial", path: "/financial", icon: PoundSterling },
    { id: 5, label: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-75 bg-gray-800 text-white min-h-screen p-4 overflow-y-auto shrink-0 flex flex-col">
      <div className="flex items-center justify-center h-16 border-b border-gray-700 mb-4">
        <h1 className="text-xl font-bold text-center">
          Egyzon Management center
        </h1>
      </div>
      <div className="flex-grow"> 
        <nav>
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-md mb-2 transition-colors ${
                  isActive
                    ? "bg-gray-700 text-white font-medium"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              {item.icon &&
                (() => {
                  const Icon = item.icon as unknown as React.ComponentType<any>;
                  return <Icon className="w-5 h-5 mr-3" />;
                })()}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <button className="flex items-center p-2 rounded-md mt-auto text-red-600 hover:bg-none hover:text-white transition-colors">
        <LogOut className="w-5 h-5 mr-3" />
        Logout
      </button>
    </aside>
  );
}
