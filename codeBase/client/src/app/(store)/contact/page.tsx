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
  const faqs = [
    {
      q: "How do I track my order delivery?",
      a: "You can track your active orders under your Account Dashboard in the Order History section, or contact customer support with your Order ID.",
    },
    {
      q: "How can I register as a vendor on Egyzon?",
      a: "Visit our Seller Registration page or select 'Become a Vendor' in the contact form to connect with our seller onboarding team.",
    },
    {
      q: "What payment methods are supported?",
      a: "We support major credit/debit cards, cash on delivery (COD), and local mobile wallets across Egyptian governorates.",
    },
    {
      q: "What is the return and refund policy?",
      a: "Products eligible for return can be requested within 14 days of delivery directly from your customer account dashboard.",
    },
  ];

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

        {/* FAQ Section */}
        <section className="space-y-6 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Quick Answers</h2>
            <p className="text-muted-foreground text-sm">
              Find quick answers to common questions about orders, shipping, and seller accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="border border-border/80 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-bold text-foreground">
                    {faq.q}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

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