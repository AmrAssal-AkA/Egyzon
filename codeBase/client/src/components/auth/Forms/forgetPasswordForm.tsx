"use client";
import React, { useState } from "react";

import Button from "@/components/ui/common/Button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import Link from "next/link";

import { authServices } from "@/services/authServices";

export default function ForgetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (
      !email ||
      email.trim() === "" ||
      email.indexOf("@") === -1 ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false
    ) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const res = await authServices.forgetPassword({ emailAddress: email });
      if (res.success) {
        setSuccess(res.message);
        toast.success(res.message);
      } else {
        setError(res.message);
        toast.error(res.message);
      }
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Failed to send password reset email";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };
  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handledisabledButton = () => {
    if (error !== "" || loading) return true;
    if (!email || email.trim() === "") return true;
    if (email.indexOf("@") === -1) return true;
    if (!isValidEmail(email)) return true;
    return false;
  };
  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email Address:
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 mt-2.5"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
              if (success) setSuccess("");
            }}
          />
        </div>
        <div className="space-y-2">
          <Button
            type="submit"
            className="w-full"
            disabled={handledisabledButton()}
            aria-label="Send Reset Link"
          >
            {loading ? <Spinner className="h-5 w-5" aria-hidden="true" /> : "Send Reset Link"}
          </Button>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-500">{success}</p>}
      </form>
      <div className="mt-4 text-lg text-muted-foreground">
        <p>
          {" "}
          Don&apos;t have an account?{" "}
          <Link href="/Register" className="text-primary hover:underline" aria-label="Register">
            Register
          </Link>
        </p>
      </div>
    </>
  );
}
