import React from "react";
import Link from "next/link";
import { Sparkles, HelpCircle, ArrowRight } from "lucide-react";
import { ContactFormSection } from "@/components/home/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Contact Us - Egyzon Customer & Vendor Support",
  description:
    "Get in touch with the Egyzon team. We provide 24/7 customer assistance, vendor onboarding guidance, and order support across Egypt.",
};

export default function ContactPage() {

  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center justify-start py-12 md:py-16 md:mt-20">
      <div className="w-full max-w-10xl px-4 md:px-20 space-y-16">
        {/* Hero Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-600 via-indigo-600 to-blue-900 text-white p-8 md:p-14 shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md border border-white/20">
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>We Are Here for You</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Contact Egyzon Support & Partner Team
            </h1>
            <p className="text-base md:text-lg text-blue-100 leading-relaxed">
              Have questions about your order, product inquiries, or becoming an Egyptian seller? Our team is dedicated to supporting your experience.
            </p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        </section>

        {/* Main Contact Form & Info Section */}
        <ContactFormSection />

        {/* Call to Action */}
        <section className="text-center py-6 space-y-4 max-w-xl mx-auto border-t pt-10">
          <h3 className="text-xl font-bold">Want to Start Selling Your Products?</h3>
          <p className="text-muted-foreground text-xs">
            Join hundreds of Egyptian shops and brand owners expanding their business on Egyzon.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/Partner"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm shadow"
            >
              <span>Explore Seller Program</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}