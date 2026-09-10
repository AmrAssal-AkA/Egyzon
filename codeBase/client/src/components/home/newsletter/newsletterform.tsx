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
        <form className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md" onSubmit={handleSubmit}>
          <input
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto px-4 py-2 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={emailInputRef}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-colors duration-300 ease-in-out"
            disabled={loading}
          >
            {loading ? <Spinner className="w-4 h-4" /> : 'Subscribe'}
          </button>
        </form>
    );
}
