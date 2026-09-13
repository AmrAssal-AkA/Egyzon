import { HeroSlideItem } from "../../../types/Hero.types";

export const DEFAULT_SLIDES: HeroSlideItem[] = [
  {
    id: 1,
    campaignLabel: "SPRING COLLECTION 2026",
    headline: "The Alexandria",
    headlineItalic: "Edit",
    description:
      "Curated essentials from world-renowned independent vendors. Experience craftsmanship redefined for the modern explorer.",
    primaryCtaText: "Shop Collection",
    primaryCtaLink: "/products",
    secondaryCtaText: "Browse Categories",
    secondaryCtaLink: "/categories",
    imageUrl: "/images/alexandria_edit.png",
  },
  {
    id: 2,
    campaignLabel: "TECH ESSENTIALS 2026",
    headline: "The Modern",
    headlineItalic: "Workspace",
    description:
      "Elevate your productivity with our curated collection of sleek mechanical keyboards, studio headphones, and desktop organizers.",
    primaryCtaText: "Explore Tech",
    primaryCtaLink: "/products",
    secondaryCtaText: "About Us",
    secondaryCtaLink: "/about",
    imageUrl: "/images/tech_essentials.png",
  },
  {
    id: 3,
    campaignLabel: "CURATED LIVING",
    headline: "The Art of",
    headlineItalic: "Living",
    description:
      "Handcrafted ceramics, minimalist lighting, and organic textiles designed to bring serenity and elegance to your home.",
    primaryCtaText: "Shop Home",
    primaryCtaLink: "/products",
    imageUrl: "/images/curated_living.png",
  },
];
