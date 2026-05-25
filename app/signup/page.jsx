import SignUpForm from "@/components/authForms/signup-form";
import React from "react";

function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center p-4 mt-30 shadow-2xl shadow-black/10 rounded-3xl dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800" >
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-3">
            Create Account
          </h1>
          <p className="text-gray-600 text-lg dark:text-gray-300">
            Join Egyzon and discover amazing deals
          </p>
        </div>

        <SignUpForm />

        <div className="text-center mt-6">
          <p className="text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-yellow-500 font-semibold hover:text-yellow-600 transition-colors"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
