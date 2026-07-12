import React from "react";

import LoginForm from "@/components/login&RegisterForm/loginForm";

function LoginPage() {
  return (
    <section className="max-w-md mx-auto space-y-2">
      <div className="text-center sm:text-left">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Sign in
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Use your email or continue with a social account.
        </p>
      </div>
      <LoginForm />
    </section>
  );
}

export default LoginPage;
