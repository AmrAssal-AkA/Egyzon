"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";

function RegisterForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register, continueWithGoogle } = useAuth();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await register({ FirstName: firstName, LastName: lastName, email, password });
      if (!res.success) {
        const message = res.message || "Registration failed";
        toast.error(message);
        setError(message);
        return;
      }
      toast.success("Registration successful!");
      router.push("/");
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ||
        (error instanceof Error ? error.message : "Registration failed");
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <button 
          type="button"
          onClick={continueWithGoogle}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background cursor-pointer"
          aria-label="Continue with Google"
       >
          <FaGoogle className="text-base" aria-hidden="true" />
          Continue with Google
        </button>

      </div>
      <div className="relative flex items-center py-1">
        <div className="h-px flex-1 bg-border" />
        <span className="px-3 text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
          or
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            htmlFor="FirstName"
            className="text-sm font-medium text-foreground"
          >
            First Name
          </label>
          <input
            type="text"
            id="FirstName"
            placeholder="Mohamed"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="LastName"
            className="text-sm font-medium text-foreground"
          >
            Last Name
          </label>
          <input
            type="text"
            id="LastName"
            placeholder="Ali"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="example@example.com"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            >
              {isPasswordVisible ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
            </button>
          </div>
        </div>
         <div className="border-b-2 border-muted-foreground mb-4"/>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          aria-label={loading ? "Creating account..." : "Register"}
        >
          {loading ? "Creating account…" : "Register"}
        </button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          type="button"
          className="font-semibold text-foreground hover:text-blue-600"
          onClick={() => router.push("/login")}
          aria-label="Login"
        >
          Login
        </button>
      </p>
    </div>
  );
}
export default RegisterForm;
