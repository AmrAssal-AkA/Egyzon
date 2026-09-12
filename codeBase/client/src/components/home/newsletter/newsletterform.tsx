"use client";

import React, { useRef, useState } from "react";

import { toast } from "sonner";

import { Spinner } from "@/components/ui/spinner";
import { subscribeNewsletter } from "@/services/newsletter.services";
import type { SubscribeNewsletterRequest, SubscribeNewsletterResponse } from "@/types/newsletter.type";

export default function NewsLetterForm() {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = emailInputRef.current?.value.trim();
        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }

        const request: SubscribeNewsletterRequest = { email };
        setLoading(true);
        try {
            const response: SubscribeNewsletterResponse = await subscribeNewsletter(request);
            toast.success(response.message || "Successfully subscribed to the newsletter.");
            if (emailInputRef.current) {
                emailInputRef.current.value = "";
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to subscribe to the newsletter.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md" onSubmit={handleSubmit}>
          <input
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            aria-label="Email address for newsletter"
            className="w-full sm:flex-1 h-11 px-4 rounded-xl bg-white text-slate-900 placeholder:text-slate-500 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400 text-sm"
            ref={emailInputRef}
          />
          <button
            type="submit"
            className="w-full sm:w-auto h-11 bg-white hover:bg-slate-100 text-blue-700 font-bold px-6 rounded-xl transition-colors duration-200 cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
            disabled={loading}
            aria-label={loading ? "Subscribing to newsletter..." : "Subscribe to newsletter"}
          >
            {loading ? <Spinner className="w-4 h-4" aria-hidden="true" /> : 'Subscribe'}
          </button>
        </form>
    );
}
