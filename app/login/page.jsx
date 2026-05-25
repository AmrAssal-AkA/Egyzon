import LoginForm from "@/components/authForms/login-form";
import React from "react";

function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center p-4 mt-20">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-lg">
            Sign in to your Egyzon account
          </p>
        </div>

        {/* Form */}
        <LoginForm />

        {/* Footer Text */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-yellow-500 font-semibold hover:text-yellow-600 transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
