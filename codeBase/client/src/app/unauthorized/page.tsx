import React from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Access Denied | Egyzon",
  description: "You do not have permission to access this page.",
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 text-center">
      <div className="max-w-md w-full p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col items-center">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-950/50 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mb-4">
          <ShieldAlert className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Access Denied
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
          You do not have the required permissions to view this page. This area is reserved exclusively for authorized sellers.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/"
            className="flex-1 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-slate-950 font-semibold rounded-xl text-center text-sm transition-colors"
          >
            Return to Home
          </Link>
          <Link
            href="/Partner"
            className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-center text-sm transition-colors"
          >
            Become a Seller
          </Link>
        </div>
      </div>
    </div>
  );
}
