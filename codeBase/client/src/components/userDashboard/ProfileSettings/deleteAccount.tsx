"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";
import { customerService } from "@/services/customer.services";

export default function DeleteAccount() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const userEmail = (user?.email || "").trim().toLowerCase();
  const isEmailMatched =
    confirmEmail.trim().toLowerCase() === userEmail && userEmail.length > 0;

  const handleOpenChange = (open: boolean) => {
    if (!open && !isDeleting) {
      setIsOpen(false);
      setConfirmEmail("");
    } else if (open) {
      setIsOpen(true);
    }
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent
  ) => {
    e.preventDefault();
    if (!isEmailMatched || isDeleting) return;

    setIsDeleting(true);
    try {
      const res = await customerService.deleteCustomer({
        email: confirmEmail.trim(),
      });

      if (res.success) {
        toast.success(res.message || "Customer account deleted successfully");
        setIsOpen(false);
        await logout();
        router.push("/login");
      } else {
        toast.error(res.message || "Failed to delete customer account");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to delete customer account";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-fit cursor-pointer rounded bg-red-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-500/20"
      >
        Delete Account
      </button>

      <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
        <AlertDialogContent className="sm:max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <AlertDialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  Delete Account
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-gray-500 dark:text-gray-400">
                  This action is permanent and cannot be undone.
                </AlertDialogDescription>
              </div>
            </div>
          </AlertDialogHeader>

          <div className="flex flex-col gap-3 py-2 text-sm text-gray-600 dark:text-gray-300">
            <p>
              Deleting your account will permanently remove all your profile
              information, order history, and personal data.
            </p>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirm-email-input"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400"
              >
                Confirm your email
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Please type{" "}
                <span className="font-semibold text-red-600 dark:text-red-400 select-all">
                  {user?.email}
                </span>{" "}
                to confirm:
              </p>
              <input
                id="confirm-email-input"
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && isEmailMatched && !isDeleting) {
                    void handleDelete(e);
                  }
                }}
                placeholder={user?.email || "Enter your email"}
                disabled={isDeleting}
                className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                autoComplete="off"
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeleting}
              onClick={() => {
                setIsOpen(false);
                setConfirmEmail("");
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleting || !isEmailMatched}
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Account"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

