import React from 'react';


export default function QuickActions() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2">
       <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
        this section is under development and will be available in the next release.
       </p>
      </div>
    </div>
  );
}
