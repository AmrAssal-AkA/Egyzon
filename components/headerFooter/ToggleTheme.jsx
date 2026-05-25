"use client";
import React, { useEffect, useState } from 'react'
import { useTheme } from "next-themes";



export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    if(!mounted) return null;


  return (
   <select value={theme} onChange={(e) => setTheme(e.target.value)} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md px-2 py-1">
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    <option value="system">System</option>
   </select>
  )
}
