

export interface ContactFormData {
  fullName: string;
  email: string;
  topic: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: ContactFormData;
}