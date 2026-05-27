"use client";
import React, { useState } from "react";
import Link from "next/link";

import { Eye, EyeClosed } from "lucide-react";

function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [NameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    //user error handling
    if(!firstName || !lastName || firstName.trim() === "" || lastName.trim() === "") {
      setNameError("Please enter both first and last name.");
      return;
    }
    if(!email || email.trim() === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if(!password || password.trim() === "" || password.length < 6) {
      setPasswordError("Please enter a password with at least 6 characters.");
      return;
    }
    if (!firstName && !lastName && !email && !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    // waiting for Auth Api integration (Backend is not ready yet)

  };

  return (
    <form
      className="w-full max-w-md bg-gradient-to-br from-white to-gray-50 p-10 rounded-2xl shadow-lg border border-gray-100 dark:bg-gray-800 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700"
      onSubmit={handleSignUp}
    >
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
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-yellow-500 dark:hover:border-gray-500  "
            type="text"
            id="firstname"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-yellow-500 dark:hover:border-gray-500  "
            type="text"
            id="lastname"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        {NameError && <p className="text-red-500 text-sm mt-2 col-span-2">{NameError}</p>}
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
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-yellow-500 dark:hover:border-gray-500  "
          type="email"
          id="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
        {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
      </div>

      {/* Password Field */}
      <div className="mb-8">
        <label
          className="block text-sm font-semibold text-gray-700 mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          {passwordVisible ? (
            <input
              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-yellow-500 dark:hover:border-gray-500"
              type="text"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          ) : (
            <input
              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-yellow-500 dark:hover:border-gray-500"
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            {passwordVisible ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
      </div>

      {/* Submit Button */}
      <button
        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 dark:bg-gradient-to-r dark:from-yellow-500 dark:to-yellow-600 dark:hover:from-yellow-600 dark:hover:to-yellow-700"
        type="submit"
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
    </form>
  );
}

export default SignUpForm;
