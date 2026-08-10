import { Suspense } from "react";
import VerifyEmailContent from "@/components/auth/VerifyEmailContent";
import { Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}