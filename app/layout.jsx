import "./globals.css";

import Mainheader from "@/components/MainHeader";
import { Footer } from "@/components/footer";
import CartProvider from "@/context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export const metadata = {
  title: "Egyzon",
  description: "Egyzon is brand new in ecommerce websites in egypt",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
        <Mainheader />
        {children}
        <ToastContainer />
        <Footer />
        </CartProvider>
      </body>
    </html>
  );
}


