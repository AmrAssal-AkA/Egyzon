import React from 'react'

import {UserCircleIcon, Bell} from "lucide-react"

export default function Header() {
  return (
    <header className="flex items-end justify-end mb-4 p-4 bg-gray-100 shadow-md overflow-clip">
      <div className="relative mr-4">
        <Bell className="cursor-pointer" />
      </div>
      <div className="flex items-center">
        <UserCircleIcon className="cursor-pointer" />
        <p className="text-sm text-gray-600 ml-2">Welcome, Admin</p>
      </div>
    </header>
  )
}
