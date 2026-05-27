import React from "react";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center p-4 mt-30 shadow-2xl shadow-black/10 rounded-3xl dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <header className="w-full max-w-md hidden md:block">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent mb-3 mr-10">
          Welcome to Egyzon
        </h1>
        <p className="text-gray-600 text-lg dark:text-gray-300">
          Your one-stop shop for amazing deals
        </p>
      </header>
      <main className="w-full max-w-md ">{children}</main>
    </div>
  );
}

export default AuthLayout;
