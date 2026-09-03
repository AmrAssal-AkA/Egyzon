import { Product } from "./product.type";
import { StoreType, BackendStoreDetails } from "./store";

export interface StoreAddress {
  street?: string;
  city: string;
  governorate: string;
  country?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface StoreOpeningHours {
  days: string;
  hours: string;
}

export interface StoreBadge {
  id: string;
  label: string;
  description: string;
  icon: "shield" | "truck" | "badge-check" | "clock" | "rotate-ccw" | "award";
}

export interface StoreSocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  website?: string;
}

export interface StorefrontDetails {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  aboutStory?: string;
  logo: string;
  banner: string;
  storeType: StoreType; // "physical" | "online"
  isVerified: boolean;
  address?: StoreAddress;
  rating: number;
  reviewCount: number;
  positiveFeedbackRate?: number; // e.g. 98%
  responseTime?: string; // e.g. "within an hour"
  joinedDate: string; // e.g. "Joined March 2024"
  phone?: string;
  email?: string;
  openingHours?: StoreOpeningHours[];
  badges?: StoreBadge[];
  socialLinks?: StoreSocialLinks;
  products: Product[];
  featuredProductIds?: string[];
}

export type StorefrontTab = "home" | "products" | "categories" | "about";

export type StoreProductSort =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "highest-rated";

export type StoreAvailabilityFilter = "all" | "in-stock" | "on-sale";

export interface StoreCategoryItem {
  id: string;
  name: string;
  productCount: number;
  image?: string;
}

export function mapBackendStoreToStorefront(
  storeData: BackendStoreDetails,
  products: Product[] = []
): StorefrontDetails {
  const storeMgmt = storeData.storeManagement || {};
  const isPhysical = storeMgmt.storeType === "physical";
  const addressText = isPhysical
    ? storeMgmt.storePhysicalAddress
    : storeMgmt.storeOnlineAddress;

  const storeProducts =
    storeData.products && storeData.products.length > 0
      ? storeData.products
      : products;

  const storeName = storeData.storeName || "Egyzon Seller Store";
  const desc =
    storeMgmt.storeDescription ||
    `${storeName} is an authorized seller on the Egyzon marketplace.`;

  return {
    id: storeData._id || "unknown",
    name: storeName,
    slug: storeName
      ? storeName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      : storeData._id || "store",
    tagline:
      storeMgmt.storeDescription && storeMgmt.storeDescription.length > 100
        ? `${storeMgmt.storeDescription.slice(0, 97)}...`
        : storeMgmt.storeDescription,
    description: desc,
    aboutStory:
      storeMgmt.storeDescription ||
      `Welcome to ${storeName}. We are dedicated to providing authentic quality products with fast and reliable shipping across Egypt.`,
    logo:
      storeMgmt.storeLogo ||
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&auto=format&fit=crop&q=80",
    banner:
      storeMgmt.storeBanner ||
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=80",
    storeType: isPhysical ? "physical" : "online",
    isVerified: storeData.applicantStatus === "approved" || true,
    address:
      isPhysical && addressText
        ? {
            street: addressText,
            city: "Egypt",
            governorate: "Egypt",
            country: "Egypt",
          }
        : undefined,
    rating: storeData.rating ?? 4.8,
    reviewCount: storeData.reviewCount ?? 0,
    positiveFeedbackRate: 98.5,
    responseTime: "within 1 hour",
    joinedDate: storeData.createdAt
      ? new Date(storeData.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "Active Seller",
    badges: [
      {
        id: "b1",
        label: isPhysical ? "Verified Physical Store" : "Verified Online Vendor",
        description: isPhysical
          ? "Authentic retail store in Egypt"
          : "Official online store verified by Egyzon",
        icon: isPhysical ? "award" : "badge-check",
      },
      {
        id: "b2",
        label: "Secure Transactions",
        description: "Protected by Egyzon Buyer Escrow & Safe Delivery",
        icon: "shield",
      },
      {
        id: "b3",
        label: "Nationwide Shipping",
        description: "Express doorstep delivery across all 27 governorates",
        icon: "truck",
      },
    ],
    products: storeProducts,
  };
}

