import React from "react";


export default function LoginForm() {
  return (
    <form className="w-full max-w-md bg-gradient-to-br from-white to-gray-50 p-10 rounded-2xl shadow-lg border border-gray-100 dark:bg-gray-800 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700">
      {/* Email Field */}
      <div className="mb-6">
        <label
          className="block text-sm font-semibold text-gray-700 mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-yellow-500 dark:hover:border-gray-500"
          type="email"
          id="email"
          placeholder="your@email.com"
        />
      </div>

      {/* Password Field */}
      <div className="mb-2">
        <label
          className="block text-sm font-semibold text-gray-700 mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-yellow-500 dark:hover:border-gray-500  "
          type="password"
          id="password"
          placeholder="Enter password"
        />
      </div>

      {/* Forgot Password Link */}
      <div className="text-right mb-8">
        <a
          href="#"
          className="text-sm text-yellow-500 hover:text-yellow-600 font-medium transition-colors dark:text-yellow-400 dark:hover:text-yellow-300"
        >
          Forgot password?
        </a>
      </div>

      {/* Login Button */}
      <button
        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 dark:bg-gradient-to-r dark:from-yellow-500 dark:to-yellow-600 dark:hover:from-yellow-600 dark:hover:to-yellow-700"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
