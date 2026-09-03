export type StoreType = "physical" | "online";

export interface Seller {
  id?: string;
  name?: string;
  storeName?: string;
  storeLogo?: string;
  FirstName?: string;
  LastName?: string;
  feedbackPercentage?: number;
  storeManagement?: {
    storeLogo?: string;
    storeBanner?: string;
  };
  totalProducts?: number;
  isVerified?: boolean;
}

export interface AddressSuggestion {
  id: string;
  name: string;
  city: string;
  governorate: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
}

export interface StorefrontFormData {
  storeName: string;
  description: string;
  storeType: StoreType;
  address: string;
  city: string;
  logo: File | null;
  logoPreview: string | null;
  banner: File | null;
  bannerPreview: string | null;
}

export interface StoreValidationErrors {
  storeName?: string;
  description?: string;
  storeType?: string;
  address?: string;
  logo?: string;
  banner?: string;
  general?: string;
}

export interface CreateStoreResponse {
  success: boolean;
  message: string;
  data?: {
    storeId?: string;
    storeName?: string;
    storeType?: StoreType;
    description?: string;
    address?: string;
    logoUrl?: string;
    bannerUrl?: string;
  };
}

export interface BackendStoreManagement {
  storeLogo?: string;
  storeBanner?: string;
  storeDescription?: string;
  storeType?: StoreType | string;
  storePhysicalAddress?: string;
  storeOnlineAddress?: string;
}

export interface BackendStoreDetails {
  _id: string;
  commercialRegisterNumber?: string;
  taxCardNumber?: string;
  storeName: string;
  applicantStatus?: string;
  storeManagement?: BackendStoreManagement;
  createdAt?: string;
  updatedAt?: string;
  products?: any[];
  rating?: number;
  reviewCount?: number;
}

export interface StoreDetailsResponse {
  success: boolean;
  message: string;
  data?: BackendStoreDetails[] | BackendStoreDetails | null;
}

