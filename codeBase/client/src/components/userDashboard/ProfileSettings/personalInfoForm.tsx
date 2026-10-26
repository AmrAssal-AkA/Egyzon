"use client";

import React, { useState } from "react";

import { Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import { customerService } from "@/services/customer.services";

export default function PersonalInfoForm() {
  const { user, refreshSession } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.FirstName || "");
  const [lastName, setLastName] = useState(user?.LastName || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [prevSync, setPrevSync] = useState({ user, isEditing });
  if (prevSync.user !== user || prevSync.isEditing !== isEditing) {
    setPrevSync({ user, isEditing });
    if (!isEditing && user) {
      setFirstName(user.FirstName || "");
      setLastName(user.LastName || "");
    }
  }

  const handleEditName = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFirstName(user?.FirstName || "");
    setLastName(user?.LastName || "");
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (!trimmedFirstName || !trimmedLastName) {
      toast.error("Please provide both first and last name.");
      return;
    }

    if (
      trimmedFirstName === user?.FirstName &&
      trimmedLastName === user?.LastName
    ) {
      setIsEditing(false);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await customerService.changeCustomerName({
        FirstName: trimmedFirstName,
        LastName: trimmedLastName,
      });

      if (res.success) {
        toast.success(res.message || "Customer name changed successfully");
        await refreshSession();
        setIsEditing(false);
      } else {
        toast.error(res.message || "Failed to change customer name");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to change customer name";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-3xl flex-col gap-5">
      {/* Two inputs side-by-side only */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="firstName"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={!isEditing || isSubmitting}
            className={`h-11 w-full rounded-lg border px-3.5 text-sm shadow-sm transition-all outline-none ${
              isEditing
                ? "border-blue-400 bg-white text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-blue-500/70 dark:bg-gray-900 dark:text-white"
                : "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400"
            }`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="lastName"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={!isEditing || isSubmitting}
            className={`h-11 w-full rounded-lg border px-3.5 text-sm shadow-sm transition-all outline-none ${
              isEditing
                ? "border-blue-400 bg-white text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-blue-500/70 dark:bg-gray-900 dark:text-white"
                : "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400"
            }`}
          />
        </div>
      </div>

      {/* Edit Name Button on the left side */}
      <div className="flex justify-start">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleEditName}
            className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3.5 py-2 text-sm font-semibold text-blue-700 transition-colors hover:border-blue-200 hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/70 cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit Name
          </button>
        )}
      </div>

      {/* Email Input */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={user?.email || ""}
          disabled
          className="h-11 w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-500 shadow-sm outline-none dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-400"
        />
      </div>
    </form>
  );
}
