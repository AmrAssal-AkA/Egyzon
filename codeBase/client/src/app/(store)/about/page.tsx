import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Store,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
  HeartHandshake,
  ArrowRight,
  TrendingUp,
  Award,
  Globe,
} from "lucide-react";

export const metadata = {
  title: "About Us - Egyzon Multi-Vendor Platform",
  description:
    "Discover Egyzon, Egypt's premier online multi-vendor marketplace connecting local shops and vendors directly with customers across the nation.",
};

export default function AboutPage() {
  const features = [
    {
      icon: Store,
      title: "Local Vendor Empowerment",
      description:
        "Empowering Egyptian shop owners, local artisans, and brand owners by providing them a seamless platform to reach millions of customers.",
    },
    {
      icon: ShoppingBag,
      title: "Wide Product Selection",
      description:
        "Explore a rich catalog of electronics, fashion, home essentials, lifestyle goods, and local Egyptian products all in one place.",
    },
    {
      icon: ShieldCheck,
      title: "Safe & Secure Shopping",
      description:
        "Shop with confidence with protected buyer payment solutions, clear return policies, and verified vendor storefronts.",
    },
    {
      icon: Truck,
      title: "Fast Nationwide Delivery",
      description:
        "Connecting vendors and customers through an efficient delivery network covering Cairo, Alexandria, and all Egyptian governorates.",
    },
  ];

  const values = [
    {
      icon: HeartHandshake,
      title: "Trust & Transparency",
      description:
        "We build genuine relationships between buyers and sellers with transparent reviews, authentic listings, and dedicated support.",
    },
    {
      icon: TrendingUp,
      title: "Economic Growth",
      description:
        "Supporting small businesses and local entrepreneurs to digitize their storefronts and expand across the Egyptian market.",
    },
    {
      icon: Award,
      title: "Quality First",
      description:
        "We curate top-rated sellers and high-quality items to ensure every order exceeds our customers' expectations.",
    },
    {
      icon: Globe,
      title: "Egyptian Pride",
      description:
        "Celebrating local Egyptian craftsmanship and products while bringing world-class online shopping experiences home.",
    },
  ];

  return (
    <main className="w-full min-h-screen bg-background flex flex-col items-center justify-start py-12 md:py-16 md:mt-20">
      <div className="w-full max-w-10xl px-4 md:px-20 space-y-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-600 via-indigo-600 to-blue-900 text-white p-8 md:p-14 shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md border border-white/20">
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>Welcome to Egyzon</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Connecting Egyptian Sellers to Every Home.
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              Egyzon is Egypt’s premier multi-vendor marketplace designed to bring
              local shop owners, artisans, and customers together into one easy,
              reliable, and enjoyable shopping destination.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-blue-950 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors shadow-md text-sm md:text-base"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/Partner"
                className="inline-flex items-center gap-2 bg-blue-700/50 hover:bg-blue-700/70 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg backdrop-blur-md transition-colors text-sm md:text-base"
              >
                Become a Seller
              </Link>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        </section>

        {/* What We Offer */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Everything You Need in One Marketplace
            </h2>
            <p className="text-muted-foreground">
              Discover why thousands of shoppers and vendors trust Egyzon every day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
                  key={idx}
                  className="border border-border/60 hover:border-primary/40 transition-all shadow-sm hover:shadow-md"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2">
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Our Mission & Values */}
        <section className="bg-muted/40 rounded-2xl p-8 md:p-12 border border-border space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <Sparkles className="w-4 h-4" />
              <span>Our Mission & Vision</span>
            </div>
            <h2 className="text-3xl font-bold">
              Driven by Community, Quality & Innovation
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our mission is to empower local businesses across Egypt by providing them
              with a modern digital store to showcase their products, while giving
              customers a convenient, transparent, and joyful online shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-card border border-border p-6 rounded-xl space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {val.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-8 space-y-6 max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold">
            Join the Egyzon Community Today
          </h2>
          <p className="text-muted-foreground text-sm">
            Whether you are looking for your next great purchase or ready to grow your
            business across Egypt, Egyzon is here for you.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm shadow"
            >
              Start Shopping
            </Link>
            <Link
              href="/Partner"
              className="bg-secondary text-secondary-foreground font-semibold px-6 py-2.5 rounded-lg hover:bg-secondary/80 transition-colors text-sm border"
            >
              Sell on Egyzon
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}