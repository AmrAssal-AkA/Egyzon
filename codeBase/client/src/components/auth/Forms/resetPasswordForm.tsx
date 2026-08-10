"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

import Button from "@/components/ui/common/Button";
import { Spinner } from "@/components/ui/spinner";
import { authServices } from "@/services/authServices";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (!token) {
    return (
      <div className="max-w-md mx-auto p-6 bg-background border border-border rounded-2xl shadow-sm text-center space-y-4">
        <div className="flex justify-center text-destructive">
          <XCircle className="h-14 w-14" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Invalid or Missing Token
        </h2>
        <p className="text-sm text-muted-foreground">
          The password reset link is missing or invalid. Please request a new password reset link.
        </p>
        <Link
          href="/forgetPassword"
          className="inline-block w-full py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition text-center"
        >
          Request New Reset Link
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await authServices.resetPassword(
        { newPassword, confirmNewPassword: confirmPassword },
        token
      );

      if (res.success) {
        setSuccess(res.message || "Password reset successfully!");
        toast.success(res.message || "Password reset successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(res.message || "Password reset failed");
        toast.error(res.message || "Password reset failed");
      }
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Password reset failed";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Reset Password
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Please enter your new password below.
        </p>
      </div>

      {success ? (
        <div className="p-6 bg-background border border-border rounded-2xl shadow-sm text-center space-y-4">
          <div className="flex justify-center text-green-500">
            <CheckCircle className="h-14 w-14" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Password Reset Successful!
          </h2>
          <p className="text-sm text-muted-foreground">{success}</p>
          <p className="text-xs text-muted-foreground">Redirecting to login page...</p>
          <Button onClick={() => router.push("/login")} className="w-full">
            Go to Login
          </Button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-foreground"
            >
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              placeholder="Enter your new password"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 mt-1"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (error) setError("");
              }}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-foreground"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your new password"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 mt-1"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError("");
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="rounded border-input text-primary focus:ring-primary"
            />
            <label htmlFor="showPassword" className="text-sm text-muted-foreground cursor-pointer">
              Show Password
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
          >
            {loading ? <Spinner className="h-5 w-5" /> : "Reset Password"}
          </Button>

          {error && (
            <div className="space-y-2">
              <p className="text-sm text-red-500">{error}</p>
              {(error.toLowerCase().includes("token") || error.toLowerCase().includes("invalid") || error.toLowerCase().includes("expired")) && (
                <Link
                  href="/forgetPassword"
                  className="block text-sm text-primary hover:underline text-center"
                >
                  Request a new password reset link
                </Link>
              )}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
