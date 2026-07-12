import type { Metadata } from "next";

import Header from "@/components/header&footer/header";
import Footer from "@/components/header&footer/footer";
import {Toaster} from "@/components/ui/sonner";

import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/provider/theme-provider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Egyzon",
  description: "Egyzon is a platform that provides a comprehensive solution for managing and optimizing your business operations. Our platform offers a range of features designed to streamline processes, improve efficiency, and enhance decision-making. With Egyzon, you can easily track performance metrics, manage resources, and gain valuable insights into your business operations. Whether you're a small business owner or a large enterprise, Egyzon is the perfect tool to help you achieve your goals and drive success.",
};

export default function RootLayout({children} : Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning >
      
      <body className="min-h-full flex flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Header />
        {children}
        <Footer />
        <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
