import type { Metadata } from "next";

import "./globals.css";
import { Geist } from "next/font/google";
import {Toaster} from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/provider/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import NotificationListener from '@/components/seller/common/NotificationListener'
import {ToastContainer} from "@/components/toast/ToastContainer";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Egyzon",
  description: "Egyzon is a platform that provides a comprehensive solution for managing and optimizing your business operations. Our platform offers a range of features designed to streamline processes, improve efficiency, and enhance decision-making. With Egyzon, you can easily track performance metrics, manage resources, and gain valuable insights into your business operations. Whether you're a small business owner or a large enterprise, Egyzon is the perfect tool to help you achieve your goals and drive success.",
  openGraph: {
    title: "Egyzon",
    description: "Egyzon is a platform that provides a comprehensive solution for managing and optimizing your business operations. Our platform offers a range of features designed to streamline processes, improve efficiency, and enhance decision-making. With Egyzon, you can easily track performance metrics, manage resources, and gain valuable insights into your business operations. Whether you're a small business owner or a large enterprise, Egyzon is the perfect tool to help you achieve your goals and drive success.",
    url: "https://egyzon.vercel.app/",
    siteName: "Egyzon",
    images: [
      {
        url: "https://www.egyzon.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  
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
            <AuthProvider>
              {children}
              <Toaster position="bottom-left" />
              <NotificationListener />
              <ToastContainer />
            </AuthProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
