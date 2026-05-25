import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import Mainheader from "@/components/headerFooter/MainHeader";
import { Footer } from "@/components/headerFooter/footer";
import CartProvider from "@/context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import ThemeProvider from "@/providers/themeProvider";


export const metadata = {
  title: "Egyzon",
  description: "Egyzon is brand new in ecommerce websites in egypt",
};

export default async function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
        <CartProvider>
          <Mainheader  />
          {children}
          <ToastContainer  />
          <Footer />
        </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
