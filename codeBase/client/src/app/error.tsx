"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw, StickyNote } from "lucide-react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
  unstable_retry: () => void;
};

export const metadata = {
  title: "Server Error",
  description: "An unexpected error occurred while loading the page.",
};

export default function ErrorPage({ error, reset, unstable_retry }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    unstable_retry();
  };

  const digest = error.digest;

  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card px-6 py-10 shadow-sm sm:px-10 sm:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.08),transparent_28%)]" />

        <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300">
              <AlertTriangle className="h-4 w-4" />
              Ooh, server error
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Something broke while loading this page.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                We hit a server-side problem, but the rest of your workspace is still
                here. Try again or head back home to continue browsing.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-300 ease-in-out hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <RotateCcw className="h-4 w-4" />
                Try Again
              </button>

              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors duration-300 ease-in-out hover:border-blue-500 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Reset State
              </button>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-5 py-3 text-sm font-semibold text-secondary-foreground transition-colors duration-300 ease-in-out hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-300"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </div>

            {digest ? (
              <p className="text-sm text-muted-foreground">
                Error reference: <span className="font-medium text-foreground">{digest}</span>
              </p>
            ) : null}
          </section>

          <aside className="relative mx-auto flex w-full max-w-md items-center justify-center">
            <div className="relative h-80 w-full">
              <div className="absolute left-4 top-8 -rotate-6 rounded-3xl border border-amber-200 bg-amber-100 p-5 shadow-lg shadow-amber-200/40 dark:border-amber-900/50 dark:bg-amber-950/80">
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-900 dark:text-amber-200">
                  <StickyNote className="h-4 w-4" />
                  Note 01
                </div>
                <p className="mt-3 max-w-40 text-sm leading-6 text-amber-950/80 dark:text-amber-100/80">
                  Server returned an unexpected response.
                </p>
              </div>

              <div className="absolute right-4 top-16 rotate-3 rounded-3xl border border-sky-200 bg-sky-100 p-5 shadow-lg shadow-sky-200/40 dark:border-sky-900/50 dark:bg-sky-950/80">
                <div className="flex items-center gap-2 text-sm font-semibold text-sky-900 dark:text-sky-200">
                  <StickyNote className="h-4 w-4" />
                  Note 02
                </div>
                <p className="mt-3 max-w-40 text-sm leading-6 text-sky-950/80 dark:text-sky-100/80">
                  The page can usually recover with another try.
                </p>
              </div>

              <div className="absolute bottom-6 left-1/2 w-[min(100%,18rem)] -translate-x-1/2 rotate-1 rounded-3xl border border-rose-200 bg-rose-100 p-5 shadow-lg shadow-rose-200/40 dark:border-rose-900/50 dark:bg-rose-950/80">
                <div className="flex items-center gap-2 text-sm font-semibold text-rose-900 dark:text-rose-200">
                  <StickyNote className="h-4 w-4" />
                  Note 03
                </div>
                <p className="mt-3 text-sm leading-6 text-rose-950/80 dark:text-rose-100/80">
                  No data was changed. This is just a temporary rendering issue.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
