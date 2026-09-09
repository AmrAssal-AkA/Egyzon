import React, { Suspense } from "react";

import { Spinner } from "@/components/ui/spinner";
import ResetPasswordForm from "@/components/auth/Forms/resetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-8">
          <Spinner className="h-6 w-6 text-primary" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}