import React from 'react'
import Link from 'next/link'

export const Links = [
    {name: "Profile", href: "/dashboard/"},
    {name: "My Orders", href: "/my-orders"},
    {name: "Wishlist", href: "/dashboard/wishlist"}
]

export default function SideMenu() {
  return (
    <aside className="w-full md:w-64 h-auto bg-white text-black p-4 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">My Account</h2>

        <ul className="space-y-2">
            {Links.map((link) => (
                <li key={link.name} className="mb-2 hover:bg-blue-600 text-black transition duration-300 ease-in-out rounded-md p-2 dark:hover:bg-blue-500 dark:hover:text-white">
                    <Link href={link.href} className="text-sm font-medium hover:text-white transition duration-300 ease-in-out dark:text-white">
                        {link.name}
                    </Link>
                </li>
            ))}
        </ul>
    </aside>
  )
}
