import React from 'react'

import Header from "@/components/header&footer/header";
import Footer from "@/components/header&footer/footer";


export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Header />
    {children}
    <Footer />
    </>
  )
}
