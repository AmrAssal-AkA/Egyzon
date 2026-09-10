export interface RegisterPayload {
    FirstName: string;
    LastName: string;
    email: string;
    password: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthTokens {
    Access_token: string;
    refresh_token?: string;
}

export interface User {
    token?: string | null;
    Access_token?: string | null;
    refresh_token?: string | null;
    userId: string;
    email: string;
    FirstName: string;
    LastName: string;
    image: string;
    role: "customer" | "seller";
    storeName?: string;
    storeManagement?: {
        storeLogo?: string;
    };
    isCompleted?: boolean;
    orders?: Array<{
        id?: string;
        _id?: string;
        product: string;
        date: string;
        status: string;
    }>;
    address?: string[];
    phoneNumber?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}

export interface OnboardingPayload {
  address: string;
  phoneNumber: string;
  token?: string;
}

export interface ForgetPasswordPayload {
  emailAddress: string;
}

export interface ResetPasswordPayload {
  newPassword: string;
  confirmNewPassword: string;
}