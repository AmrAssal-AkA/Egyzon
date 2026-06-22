import React from "react";
import Link from "next/link";

import LoginForm from "@/components/authForms/login-form";

function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-800 flex items-center justify-center p-4 mt-30 shadow-2xl shadow-black/10 rounded-3xl dark:shadow-black/40">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-lg dark:text-gray-300">
            Sign in to your Egyzon account
          </p>
        </div>

        {/* Form */}
        <LoginForm />

        {/* Footer Text */}
        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-yellow-500 font-semibold hover:text-yellow-600 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
