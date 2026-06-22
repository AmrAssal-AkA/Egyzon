"use client"
import React from "react";
import {
  TrendingUp,
  Settings,
  ShieldCheck,
  Megaphone,
  Truck,
  Headphones,
  CheckCircle2,
  FileText,
  BadgeAlert,
  ChevronRight,
  ArrowRight,
  Store,
  Users,
  Briefcase,
  Building2,
  Home,
  StoreIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const benefits = [
  {
    icon: <Users className="w-6 h-6 text-yellow-500" />,
    title: "Reach More Customers",
    description:
      "Access thousands of shoppers across Egypt and expand your reach.",
  },
  {
    icon: <Settings className="w-6 h-6 text-yellow-500" />,
    title: "Easy Store Management",
    description:
      "Manage products, inventory, and orders efficiently in one place.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-yellow-500" />,
    title: "Secure Payments",
    description: "Receive payments through reliable and secure channels.",
  },
  {
    icon: <Megaphone className="w-6 h-6 text-yellow-500" />,
    title: "Marketing Opportunities",
    description:
      "Participate in promotions and seasonal campaigns to boost sales.",
  },
  {
    icon: <Truck className="w-6 h-6 text-yellow-500" />,
    title: "Logistics Flexibility",
    description:
      "Ship through preferred couriers or use our integrated solutions.",
  },
  {
    icon: <Headphones className="w-6 h-6 text-yellow-500" />,
    title: "Dedicated Support",
    description:
      "Get assistance from our dedicated seller success team anytime.",
  },
];

const partnerTypes = [
  {
    name: "Registered Companies",
    icon: <Building2 className="w-5 h-5 mr-2" />,
  },
  { name: "SMEs", icon: <Store className="w-5 h-5 mr-2" /> },
  { name: "Manufacturers", icon: <Settings className="w-5 h-5 mr-2" /> },
  { name: "Brand Owners", icon: <BadgeAlert className="w-5 h-5 mr-2" /> },
  { name: "Authorized Distributors", icon: <Truck className="w-5 h-5 mr-2" /> },
  { name: "Home Businesses", icon: <Home className="w-5 h-5 mr-2" /> },
  { name: "Small Stores", icon: <StoreIcon className="w-5 h-5 mr-2" /> },
];

const companyDocs = [
  "Commercial Registration",
  "Tax Card",
  "Representative National ID",
  "Bank Account Information",
  "Brand Authorization (if applicable)",
];

const StoreDocs = [
  "Store License or Registration",
  "Tax Identification Number",
  "Owner's National ID",
  "Bank Account Details",
  "Brand Authorization (if applicable)",
];

const responsibilities = [
  "Maintain accurate product information.",
  "Keep inventory updated.",
  "Ship orders within agreed timelines.",
  "Respond to customer inquiries promptly.",
  "Comply with Egyptian laws.",
  "Avoid counterfeit or prohibited items.",
  "Maintain high customer satisfaction standards.",
];

const timelineSteps = [
  {
    step: 1,
    title: "Submit Request",
    desc: "Fill out the partnership request.",
  },
  {
    step: 2,
    title: "Verification",
    desc: "We verify your submitted documents.",
  },
  { step: 3, title: "Approval", desc: "Get approved to become a partner." },
  {
    step: 4,
    title: "Store Setup",
    desc: "We assist you in setting up your store.",
  },
  {
    step: 5,
    title: "Start Selling",
    desc: "List your products and start selling!",
  },
];

const faqs = [
  {
    q: "How long does approval take?",
    a: "Approval typically takes 2-4 business days after all required documents are submitted and verified.",
  },
  {
    q: "When do sellers receive payments?",
    a: "Payments are settled on a weekly or bi-weekly basis, depending on your seller tier and bank processing times.",
  },
  {
    q: "Can individuals join?",
    a: "Yes! We welcome individual entrepreneurs and home businesses. You will just need to provide your National ID and relevant details.",
  },
  {
    q: "Are there monthly fees?",
    a: "There are no hidden monthly subscription fees. We operate on a commission-based model depending on your product category.",
  },
  {
    q: "How does shipping work?",
    a: "You can choose to use our integrated fulfillment network or manage shipping via your preferred couriers.",
  },
  {
    q: "Who provides customer support?",
    a: "We provide Tier 1 customer support for shoppers. For specific product inquiries, our team will coordinate directly with you.",
  },
];

export default function BecomeAPartnerPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-yellow-500 selection:text-white pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 pt-24 pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-transparent dark:from-yellow-900/10 dark:to-transparent" />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm font-semibold tracking-wide">
            Partner With Egyzon
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Grow Your Business <span className="text-yellow-500">With Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
            Businesses, brands, manufacturers, and entrepreneurs can expand
            their reach by partnering with our marketplace.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center cursor-pointer text-lg" onClick={() => router.push('/Partner/Register')}>
              Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg shadow border border-gray-200 dark:border-gray-700 transition-all">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* 2. Why Partner With Us */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Partner With Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We provide the ecosystem, tools, and audience you need to scale
              your online sales rapidly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-xl shadow-sm flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Who Can Join */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Who Can Join</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {partnerTypes.map((type, idx) => (
              <div
                key={idx}
                className="flex items-center px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-sm text-gray-800 dark:text-gray-200 font-medium"
              >
                {type.icon}
                {type.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Required Documents */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Required Documents
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Prepare these documents to ensure a smooth onboarding process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Companies */}
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center mb-6">
                <Building2 className="w-8 h-8 text-yellow-500 mr-4" />
                <h3 className="text-2xl font-bold">Companies</h3>
              </div>
              <ul className="space-y-4">
                {companyDocs.map((doc, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stores */}
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center mb-6">
                <StoreIcon className="w-8 h-8 text-yellow-500 mr-4" />
                <h3 className="text-2xl font-bold">Stores</h3>
              </div>
              <ul className="space-y-4">
                {StoreDocs.map((doc, idx) => (
                  <li
                    key={idx}
                    className="flex items-start text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Seller Responsibilities */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Seller Responsibilities
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We maintain a high standard for our customers. Here is what we
              expect from you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {responsibilities.map((resp, idx) => (
              <div
                key={idx}
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full mr-4 flex-shrink-0">
                  <FileText className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <span className="text-gray-800 dark:text-gray-200 font-medium">
                  {resp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Fees & Commission */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Fees & Commission
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            We believe in transparent pricing to help you grow without
            unexpected costs. Our fees are structured around the services you
            use, which may include:
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              "Category Commissions",
              "Advertising Services",
              "Payment Processing",
              "Logistics Services",
            ].map((fee, i) => (
              <span
                key={i}
                className="px-5 py-2 bg-gray-100 dark:bg-gray-800 rounded-full font-semibold text-gray-700 dark:text-gray-200"
              >
                {fee}
              </span>
            ))}
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 p-6 rounded-xl inline-block max-w-2xl">
            <div className="flex items-center justify-center text-yellow-800 dark:text-yellow-400 font-medium text-left">
              <BadgeAlert className="w-8 h-8 md:w-6 md:h-6 mr-3 flex-shrink-0" />
              <p>
                Detailed pricing and commission structures are shared during the
                onboarding process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. How It Works (Timeline) */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start selling in 5 easy steps.
            </p>
          </div>

          <div className="relative">
            {/* Desktop Horizontal Line */}
            <div className="hidden md:block absolute top-[2.25rem] left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0"></div>

            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 relative z-10">
              {timelineSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center max-w-[180px] relative"
                >
                  {/* Mobile Vertical Line */}
                  {idx !== timelineSteps.length - 1 && (
                    <div className="md:hidden absolute top-16 left-1/2 w-1 h-full bg-gray-200 dark:bg-gray-700 -translate-x-1/2 z-[-1]"></div>
                  )}
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 border-4 border-yellow-500 shadow-md flex items-center justify-center text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {step.step}
                  </div>
                  <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-lg text-gray-900 dark:text-white">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 text-gray-500 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl bg-gray-900 dark:bg-gray-800 rounded-3xl overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-transparent"></div>
          <div className="relative p-12 md:p-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join our marketplace and unlock new opportunities to scale your
              business.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-lg shadow-lg transition-all text-lg">
                Become a Partner
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-gray-400 hover:border-white text-white font-semibold rounded-lg transition-all text-lg">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
