import React from 'react';
import Link from 'next/link';
import { CreditCard, MapPin, User, Settings, HelpCircle } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    { name: 'Edit Profile', icon: User, href: '/dashboard/profile' },
    { name: 'Payment Methods', icon: CreditCard, href: '/dashboard/payments' },
    { name: 'Addresses', icon: MapPin, href: '/dashboard/addresses' },
    { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
    { name: 'Support', icon: HelpCircle, href: '/dashboard/support' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col h-full">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className="flex flex-col items-center justify-center p-3 text-center border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 ease-in-out"
          >
            <action.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {action.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
