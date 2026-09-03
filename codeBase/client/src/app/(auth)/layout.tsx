import React from "react";

import Header from "@/components/header&footer/header";
import Footer from "@/components/header&footer/footer";


export const metadata = {
  title: "Egyzon - Auth",
  description: "Welcome to Egyzon, your one-stop destination for a wide range of products.",
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Header />
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-slate-100 to-slate-200 px-4 py-10 sm:px-6 mt-8 lg:px-8 dark:from-background dark:via-secondary dark:to-background">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <section className="flex flex-col justify-center rounded-4xl border border-white/60 bg-slate-800 dark:bg-slate-950 px-8 py-4 text-white shadow-2xl shadow-slate-950/10 sm:px-10 sm:py-12 dark:border-border">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
              Egyzon
            </p>
            <h1 className="max-w-md text-4xl font-semibold tracking-tight sm:text-5xl">
              Welcome back to Egyzon
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
              Sign in to manage your account, pick up where you left off, and
              keep everything in one place.
            </p>
          </section>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-4xl border border-border bg-card/90 p-5 text-card-foreground shadow-2xl shadow-slate-950/10 backdrop-blur sm:p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
      <Footer />
      </>
  );
}

export default AuthLayout;
