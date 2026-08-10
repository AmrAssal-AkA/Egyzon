"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { verifyEmail } = useAuth();
  const router = useRouter()
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("");
  const called = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Verification token is missing.");
      return;
    }

    if (called.current) return;
    called.current = true;

    const verify = async () => {
      setStatus("loading");
      const res = await verifyEmail(token);
      if (res.success) {
        setStatus("success");
        setMessage(res.message || "Email verified successfully!");
        setTimeout(() => {
          router.replace("/onBoarding")
        }, 2000)
      } else {
        setStatus("error");
        setMessage(res.message || "Invalid or expired token.");
      }
    };

    verify();
  }, [token, verifyEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-950 border rounded-2xl shadow-sm text-center">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <h2 className="text-xl font-semibold">Verifying your email...</h2>
            <p className="text-muted-foreground">Please wait while we verify your email address.</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-semibold">Verification Successful!</h2>
            <p className="text-muted-foreground">{message}</p>
            <p className="text-sm text-muted-foreground">Redirecting to onboarding...</p>
            <Button asChild className="mt-6 w-full">
              <Link href="/onBoarding">Continue to Onboarding</Link>
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4">
            <XCircle className="h-16 w-16 text-destructive" />
            <h2 className="text-2xl font-semibold">Verification Failed</h2>
            <p className="text-muted-foreground">{message}</p>
            <Button asChild variant="outline" className="mt-6 w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
