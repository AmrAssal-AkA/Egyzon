import React, { useRef, useState } from "react";
import { Navigate } from "react-router-dom";

import { useAlert } from "../hooks/useAlert";
import { useAuth } from "../hooks/useAuth";

function HomePage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, loading } = useAuth();
  const { showError, showSuccess } = useAlert();

  if (!loading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value ?? "";

    if (!email || !password) {
      showError("Please fill in both email and password fields.");
      return;
    }

    if (!email.includes("@egyzon.com")) {
      showError("Please use your work email to login.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await login({ email, password });

      if (!response.success) {
        showError(response.message || "Invalid email or password.");
        return;
      }

      showSuccess("Logged in successfully.");
    } catch (error) {
      console.error("Login failed:", error);
      showError("Something went wrong while logging in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-white">
      <div className="flex w-full h-full">
        <div className="hidden w-1/2 md:block h-full">
          <img
            src="/background.png"
            alt="Admin dashboard background"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full p-8 md:w-1/2 flex flex-col justify-center h-full">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold">
              Welcome to the Admin Dashboard
            </h1>
            <p className="text-gray-600">Please login to continue</p>
          </div>
          <form
            className="flex flex-col space-y-4 max-w-md mx-auto w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="font-semibold text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="enter your work email"
                ref={emailRef}
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="font-semibold text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ref={passwordRef}
                required
                placeholder="enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
