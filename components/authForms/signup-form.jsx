import React from "react";

function SignUpForm() {
  return (
    <form className="w-full max-w-md bg-gradient-to-br from-white to-gray-50 p-10 rounded-2xl shadow-lg border border-gray-100">
      {/* Name Fields - Side by Side */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            htmlFor="firstname"
          >
            First Name
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300"
            type="text"
            id="firstname"
            placeholder="First Name"
          />
        </div>
        <div>
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            htmlFor="lastname"
          >
            Last Name
          </label>
          <input
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300"
            type="text"
            id="lastname"
            placeholder="Last Name"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="mb-6">
        <label
          className="block text-sm font-semibold text-gray-700 mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300"
          type="email"
          id="email"
          placeholder="your@email.com"
        />
      </div>

      {/* Password Field */}
      <div className="mb-8">
        <label
          className="block text-sm font-semibold text-gray-700 mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300"
          type="password"
          id="password"
          placeholder="Enter password"
        />
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;
