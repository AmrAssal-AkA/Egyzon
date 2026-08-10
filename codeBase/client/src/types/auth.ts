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

export interface User {
    userId: string;
    email: string;
    FirstName: string;
    LastName: string;
    image: string;
    role: "customer" | "seller";
    isCompleted?: boolean;
    address?: string | Record<string, unknown>;
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