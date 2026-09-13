"use client";

import React, { useState } from "react";

import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { sendContact } from "@/services/contact.services";

export function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await sendContact({
        fullName: formData.name,
        email: formData.email,
        topic: formData.subject,
        message: formData.message,
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        console.error("Error sending contact form:", res.message);
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Contact Info Sidebar */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">Get in Touch</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Have questions about buying, selling, or order support? Our team is
            available 6 days a week to assist you.
          </p>
        </div>

        <div className="space-y-4">
          <Card className="border border-border/70 hover:border-primary/40 transition-all shadow-sm">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm">Headquarters</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  90th Street, Fifth Settlement, New Cairo, Egypt
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/70 hover:border-primary/40 transition-all shadow-sm">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm">Email Support</h4>
                <p className="text-xs text-muted-foreground">
                  support@egyzon.com
                </p>
                <p className="text-xs text-muted-foreground">
                  vendors@egyzon.com
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/70 hover:border-primary/40 transition-all shadow-sm">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm">Phone Hotline</h4>
                <p className="text-xs text-muted-foreground">
                  +20 100 000 9988
                </p>
                <p className="text-xs text-muted-foreground">
                  Sat to Thu: 9:00 AM 7:00 PM (EGY)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-border/70 hover:border-primary/40 transition-all shadow-sm">
            <CardContent className="flex items-start gap-4 p-5">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-sm">Response Time</h4>
                <p className="text-xs text-muted-foreground">
                  Inquiries answered within 24 hours.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Form Section */}
      <div className="lg:col-span-7">
        <Card className="border border-border shadow-md">
          <CardHeader className="border-b bg-muted/20">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <MessageSquare className="w-4 h-4" />
              <span>Send Us a Message</span>
            </div>
            <CardTitle className="text-2xl font-bold">
              We&apos;re Here to Help
            </CardTitle>
            <CardDescription className="text-xs">
              Fill out the form below and our customer support or vendor
              partnership team will get back to you promptly.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Message Sent!
                </h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Thank you for reaching out to Egyzon. Our support
                  representative will contact you via email shortly.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      subject: "general",
                      message: "",
                    });
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold text-foreground"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Ahmed Hassan"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold text-foreground"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="ahmed@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="subject"
                    className="text-xs font-semibold text-foreground"
                  >
                    Topic / Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="e.g. Customer Support"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="text-xs font-semibold text-foreground"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="How can we help you today?"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-background border border-input text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={loading}
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
                  aria-label={loading ? "Sending message..." : "Send Message"}
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
