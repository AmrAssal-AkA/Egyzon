import React from 'react'
import Link from 'next/link'

export default function SellerFooter() {
  return (
    <footer className="w-full py-4 px-6 sm:px-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 rounded-xl shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm transition-colors duration-200">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>&copy; {new Date().getFullYear()} Egyzon Seller Hub. All rights reserved.</span>
      </div>
      <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
        <Link href="/Partner#hub" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Seller Guide">
          Seller Guide
        </Link>
        <span className="text-slate-300 dark:text-slate-700">•</span>
        <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="Contact Support">
          Vendor Support
        </Link>
      </div>
    </footer>
  )
}

