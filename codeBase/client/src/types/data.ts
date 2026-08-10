export interface Statistic {
  value: string;
  label: string;
}

export interface Feature {
  icon: string; 
  title: string;
  description: string;
}

export interface JourneyStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  company: string;
  avatar: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const statistics: Statistic[] = [
  {
    value: "10k+",
    label: "Active Sellers",
  },
  {
    value: "12M+",
    label: "Monthly Visitors",
  },
  {
    value: "150+",
    label: "Countries Reached",
  },
  {
    value: "24/7",
    label: "Vendor Support",
  },
];

export const features: Feature[] = [
  {
    icon: "commission",
    title: "Low commission",
    description: "Keep more of your hard-earned profits with our industry-leading low commission rates starting at just 5%.",
  },
  {
    icon: "reach",
    title: "Global reach",
    description: "Instantly unlock access to millions of active buyers worldwide and ship seamlessly with our partner network.",
  },
  {
    icon: "support",
    title: "24/7 support",
    description: "Get dedicated seller support whenever you need it. Our team is here to help your business grow day and night.",
  },
];

export const journeySteps: JourneyStep[] = [
  {
    stepNumber: 1,
    title: "Register",
    description: "Create your vendor account in under 2 minutes with basic business details.",
  },
  {
    stepNumber: 2,
    title: "Upload Docs",
    description: "Upload verification documents (ID, business registration, or tax documents) to secure your storefront.",
  },
  {
    stepNumber: 3,
    title: "Start Selling",
    description: "Go live, list your products, and manage orders instantly from your seller dashboard.",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "Egyzon completely transformed our retail brand. We went from a local store to exporting our hand-crafted home decor goods to over 10 countries within our first year. The seller tools are extremely user-friendly.",
    name: "Farida Hassan",
    company: "Founder, Artisana Egypt",
    avatar: "/images/testimonial-farida.jpg",
  },
  {
    quote: "As a technology reseller, shipping logistics and payment security were always our biggest challenges. Egyzon's integrated logistics and secure Escrow payments resolved all our concerns instantly.",
    name: "Tarek Amin",
    company: "Operations Director, TechHub",
    avatar: "/images/testimonial-tarek.jpg",
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Safety & Security", href: "/safety" },
      { label: "Contact Us", href: "/contact" },
      { label: "F.A.Q", href: "/faq" },
    ],
  },
  {
    title: "Selling",
    links: [
      { label: "Sell on Egyzon", href: "/Partner" },
      { label: "Seller Categories", href: "/categories" },
      { label: "Seller Guide", href: "/seller-guide" },
      { label: "Fees & Pricing", href: "/pricing" },
    ],
  },
];
