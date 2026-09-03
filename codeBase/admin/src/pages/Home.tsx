import React, { useRef, useState } from "react";

import { Navigate } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  CheckCircle2,
} from "lucide-react";

import { useAlert } from "../hooks/useAlert";
import { useAuth } from "../hooks/useAuth";

const FEATURES = [
  {
    icon: TrendingUp,
    title: "Marketplace Analytics",
    description: "Real-time revenue monitoring and multi-vendor performance tracking.",
  },
  {
    icon: Users,
    title: "Seller & User Governance",
    description: "Streamlined KYC verification, catalog review, and account management.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Protection",
    description: "Role-based administrative controls with encrypted session handling.",
  },
];

function HomePage(): React.ReactElement {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { login, isAuthenticated, loading } = useAuth();
  const { showError, showSuccess } = useAlert();

  if (!loading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    <>
      <title>Egyzon Admin | Sign In</title>
      <meta
        name="description"
        content="Admin dashboard for managing sellers and users on the Egyzon platform."
      />

      <main className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-gray-50">
        {/* Left Branding Showcase Panel (Desktop) */}
        <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col justify-between relative p-10 xl:p-16 overflow-hidden bg-gray-950 text-white border-r border-gray-800">
          {/* Background Image with Ambient Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="/background.png"
              alt="Egyzon Administration Backdrop"
              className="h-full w-full object-cover opacity-20 filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-950/95 via-gray-900/90 to-gray-950/95" />
          </div>

          {/* Ambient Glow Accents */}
          <div
            className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Brand Header */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-600/30 ring-1 ring-blue-400/30">
                E
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-white">
                  Egyzon
                </h2>
                <p className="text-xs text-gray-400 font-medium">
                  Management Center
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-800/80 text-gray-300 border border-gray-700/80 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Internal Portal
            </span>
          </div>

          {/* Value Proposition Content */}
          <div className="relative z-10 my-auto py-12 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
              <ShieldCheck className="w-4 h-4" />
              Enterprise Administration
            </div>

            <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight mb-4">
              Unified control for the Egyzon marketplace ecosystem.
            </h1>

            <p className="text-base text-gray-300/90 leading-relaxed mb-8">
              Monitor key business metrics, process seller approvals, manage platform
              fees, and oversee customer support workflows in real time.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-4">
              {FEATURES.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-gray-900/60 border border-gray-800/80 backdrop-blur-xs hover:border-gray-700/80 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-blue-600/15 text-blue-400 border border-blue-500/20 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-200">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Left Footer */}
          <div className="relative z-10 pt-6 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              System Status: Operational
            </span>
            <span>Security standard: ISO / SOC2</span>
          </div>
        </div>

        {/* Right Authentication Form Panel */}
        <div className="col-span-1 lg:col-span-6 xl:col-span-5 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 min-h-screen">
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-md">
                E
              </div>
              <div className="text-left">
                <h2 className="text-lg font-bold tracking-tight text-gray-900">
                  Egyzon
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Management Center
                </p>
              </div>
            </div>

            {/* Login Card Container */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xl shadow-gray-200/50 p-7 sm:p-9">
              <div className="mb-6 text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 mb-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Staff Authorization
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Enter your work credentials to access the admin dashboard.
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    Work Email
                  </label>
                  <div className="relative rounded-xl shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      ref={emailRef}
                      required
                      placeholder="admin@egyzon.com"
                      autoComplete="email"
                      disabled={isSubmitting || loading}
                      className="block w-full rounded-xl border border-gray-300/90 pl-10 pr-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-gray-500 pl-1">
                    Must end with <span className="font-semibold">@egyzon.com</span>
                  </p>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative rounded-xl shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      ref={passwordRef}
                      required
                      placeholder="••••••••••••"
                      autoComplete="current-password"
                      disabled={isSubmitting || loading}
                      className="block w-full rounded-xl border border-gray-300/90 pl-10 pr-10 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 disabled:bg-gray-100 disabled:cursor-not-allowed transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-blue-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In to Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Security Banner / Notice */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-start gap-2.5 text-left text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                <p className="leading-normal">
                  Restricted to authorized Egyzon administrators. All connection and authentication attempts are logged for security audits.
                </p>
              </div>
            </div>

            {/* Copyright / Version Info */}
            <p className="mt-6 text-center text-xs text-gray-400">
              &copy; {new Date().getFullYear()} Egyzon Marketplace Inc. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default HomePage;
