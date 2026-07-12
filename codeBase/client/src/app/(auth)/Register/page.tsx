import React from "react";

import RegisterForm from "@/components/login&RegisterForm/RegisterForm";

function RegisterPage() {
  return (
    <section className="max-w-md mx-auto space-y-2 mt-20">
      <div className="text-center sm:text-left">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground">
          Create an account
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Fill in the details below to create your account.
        </p>
      </div>
      <RegisterForm />
    </section>
  );
}

export default RegisterPage;
