import PartnerPage from "@/components/seller/BecomePartnerComp/PartnerPage";


export const metadata = {
  title: "Become a Seller | Egyzon",
  description:
    "Join Egyzon as a seller and unlock the potential of your business. Connect with customers, showcase your products, and grow your brand in Egypt's leading multi-vendor e-commerce marketplace.",
  keywords:
    "Egyzon, Become a Seller, Multi-vendor Marketplace, E-commerce, Egypt, Online Selling, Business Growth, Product Showcase, Customer Connection",
  openGraph: {
    title: "Become a Seller | Egyzon",
    description:
      "Join Egyzon as a seller and unlock the potential of your business. Connect with customers, showcase your products, and grow your brand in Egypt's leading multi-vendor e-commerce marketplace.",
    url: "https://www.egyzon.com/Partner",
    siteName: "Egyzon",
    locale: "en_US",
    type: "website",
  },
  robots:{
    index:true,
    follow:true,
    nocache:true,
    noimageindex:true,
    nosnippet:true,
    notranslate:true,
  }
}

export default function Partner() {
  return <PartnerPage />;
}