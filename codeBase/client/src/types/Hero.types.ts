export interface HeroSlideItem {
  id: string | number;
  campaignLabel: string;
  headline: string;
  headlineItalic?: string; 
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imageUrl: string;
  bgGradient?: string;
}

export interface HeroCarouselProps {
  slides?: HeroSlideItem[];
  autoPlayInterval?: number;
}
