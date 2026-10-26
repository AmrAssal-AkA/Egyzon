"use client";

import React, { useState } from "react";

import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { customerService } from "@/services/customer.services";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [error, setError] = useState("");

  const toggleVisibility = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }

    if (!/[A-Z]/.test(formData.newPassword)) {
      toast.error("New password must contain at least one uppercase letter.");
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      toast.error("New password cannot be the same as your current password.");
      return;
    }

    setLoading(true);

    try {
      const res = await customerService.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      if (res.success) {
        toast.success(res.message || "Password changed successfully.");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setError(res.message || "Failed to change password.");
      }
    } catch (err: unknown) {
      const errMsg =
        err instanceof Error ? err.message : "Failed to change password.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-2xl flex-col gap-5"
    >
      {/* Current Password */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="currentPassword"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Current Password
        </label>
        <div className="relative">
          <input
            type={showPassword.current ? "text" : "password"}
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            disabled={loading}
            className="w-full h-11 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 pr-11 text-sm text-gray-900 dark:text-white shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            required
          />
          <button
            type="button"
            onClick={() => toggleVisibility("current")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors cursor-pointer p-0.5"
            aria-label={
              showPassword.current ? "Hide password" : "Show password"
            }
          >
            {showPassword.current ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeClosed className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* New & Confirm Password */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="newPassword"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword.new ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              disabled={loading}
              className="w-full h-11 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 pr-11 text-sm text-gray-900 dark:text-white shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              required
            />
            <button
              type="button"
              onClick={() => toggleVisibility("new")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors cursor-pointer p-0.5"
              aria-label={showPassword.new ? "Hide password" : "Show password"}
            >
              {showPassword.new ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeClosed className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPassword.confirm ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              className="w-full h-11 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3.5 pr-11 text-sm text-gray-900 dark:text-white shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              required
            />
            <button
              type="button"
              onClick={() => toggleVisibility("confirm")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors cursor-pointer p-0.5"
              aria-label={
                showPassword.confirm ? "Hide password" : "Show password"
              }
            >
              {showPassword.confirm ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeClosed className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex justify-start pt-1">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Changing Password...
            </>
          ) : (
            "Change Password"
          )}
        </button>
      </div>
    </form>
  );
}
