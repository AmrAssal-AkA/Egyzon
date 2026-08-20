export interface LoginPayload {
  email: string;
  password: string;
}

export interface Admin {
  _id: string;
  email: string;
  FirstName: string;
  LastName: string;
  role: "admin";
  employeeId?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface LoginResponseData {
  user: Admin;
}

export interface AuthContextValue {
  admin: Admin | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<ApiResponse<LoginResponseData>>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
}
