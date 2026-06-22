import ForgetPasswordForm from "@/components/authForms/forgetpassword-form";
import React from "react";

function ForgetPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-800 flex items-center justify-center p-4 mt-30 shadow-2xl shadow-black/10 dark:shadow-black/40 rounded-3xl">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-200 dark:to-yellow-400 bg-clip-text text-transparent mb-8">
            Forgot Password?
          </h1>
          <ForgetPasswordForm />
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordPage;
