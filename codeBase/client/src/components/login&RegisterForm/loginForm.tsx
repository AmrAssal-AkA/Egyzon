"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "sonner";

function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
        //wait for backend
    }catch(error: unknown) {
        toast.error("Login failed. Please check your credentials and try again.");
        setError((error instanceof Error ? error.message : (error as Error).message));
        setLoading(false);
    }finally {
        setLoading(false);
    }
  }
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background cursor-pointer">
          <FaGoogle className="text-base" />
          Continue with Google
        </button>
        <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background cursor-pointer">
          <FaFacebook className="text-base text-[#1877F2]" />
          Continue with Facebook
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
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
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
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background cursor-pointer"
        
        >
          Login
        </button>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-500">Login successful!</p>}
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          className="font-semibold text-foreground hover:text-blue-600"
          onClick={() => router.push("/Register")}
        >
          Register
        </button>
      </p>
    </div>
  );
}

export default LoginForm;
