export type UserRole = "seller" | "customer" | "admin";

export type UserStatus = "active" | "suspended";

export type UserTab = "all" | UserRole;

export interface ApiUser {
  _id: string;
  FirstName: string;
  LastName: string;
  email: string;
  role: string;
  joinedDate: string;
  lastActiveDate: string;
  isBlocked: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedDate: string;
  lastActivity: string;
  avatarUrl?: string;
  verified?: boolean;
}

export interface UserFilters {
  query: string;
  role: UserRole | "all";
  tab: UserTab;
}
