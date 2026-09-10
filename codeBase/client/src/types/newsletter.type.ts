

export interface SubscribeNewsletterRequest {
  email: string;
}

export interface SubscribeNewsletterResponse {
  success: boolean;
  message: string;
  data?: unknown;
}