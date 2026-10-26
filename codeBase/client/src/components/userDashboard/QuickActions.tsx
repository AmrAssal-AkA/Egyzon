import React from "react";
import { UserCog2 } from "lucide-react";
import Link from "next/link";

export default function QuickActions() {
  const Actions = [
    {
      id: 1,
      name: "profile settings",
      icon: <UserCog2 className="w-6 h-6" />,
      link: "/dashboard/profileSettings",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Actions.map((action) => (
          <Link
            key={action.id}
            href={action.link}
            className="group aspect-square flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/30  dark:hover:bg-gray-700 hover:bg-blue-600 dark:hover:border-blue-400 hover:shadow-md transition-all duration-200 text-center"
          >
            <div className="p-3 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 shadow-sm border border-gray-100 dark:border-gray-700 group-hover:scale-110 transition-transform duration-200 mb-2">
              {action.icon}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600  dark:group-hover:text-blue-400 capitalize transition-colors">
              {action.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
