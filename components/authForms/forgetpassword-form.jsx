import React from "react";
import Link from "next/link";
import {Mail , Zap} from "lucide-react"

export default function ForgetPasswordForm() {
  return (
    <form className="w-full max-w-md bg-gradient-to-br from-white to-gray-50 p-10 rounded-2xl shadow-2xl border border-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 transition-all duration-300 animate-fadeIn">
      {/* Header Section */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">
          Account Recovery
        </p>
      </div>

      {/* Email Field */}
      <div className="mb-8">
        <label
          className="block text-sm font-bold text-gray-800 mb-3 dark:text-gray-200"
          htmlFor="email"
        >
          Email Address
        </label>
        <div className="relative group">
          <input
            className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 bg-white hover:border-yellow-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-yellow-500 dark:hover:border-gray-500 dark:hover:bg-gray-750 shadow-sm group-hover:shadow-md"
            type="email"
            id="email"
            placeholder="your@email.com"
            required
          />
          <Mail className="absolute right-4 top-4 w-5 h-5 text-gray-400 group-hover:text-yellow-500 transition-colors" />
        </div>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
        We'll send you a link to reset your password. Check your email shortly.
      </p>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold py-4 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 dark:bg-gradient-to-r dark:from-yellow-500 dark:to-yellow-600 dark:hover:from-yellow-600 dark:hover:to-yellow-700 flex items-center justify-center gap-2"
      >
        <span>Send Reset Link</span>
        <Zap className="w-5 h-5 text-white" />
      </button>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
            or
          </span>
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex gap-3 text-center">
        <Link
          href="/login"
          className="flex-1 text-sm text-yellow-600 hover:text-yellow-700 font-semibold dark:text-yellow-400 dark:hover:text-yellow-300 py-2 rounded-lg hover:bg-yellow-50 dark:hover:bg-gray-800 transition-colors"
        >
          Back to Login
        </Link>
        <Link
          href="/signup"
          className="flex-1 text-sm text-gray-600 hover:text-gray-700 font-semibold dark:text-gray-400 dark:hover:text-gray-300 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Create Account
        </Link>
      </div>
    </form>
  );
}
