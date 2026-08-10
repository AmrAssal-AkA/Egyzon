export const Roles = {
  CUSTOMER: "customer",
  SELLER: "seller"
} as const;

export type Role = typeof Roles[keyof typeof Roles];

export const isCustomer = (role?: string | null): boolean => role === Roles.CUSTOMER;
export const isSeller = (role?: string | null): boolean => role === Roles.SELLER;

export const hasRole = (role: string | null, allowedRoles: string[]): boolean => {
  if (!role) return false;
  return allowedRoles.includes(role);
};

export const isAuthorized = (role: string | null, allowedRoles?: string[]): boolean => {
  if (!allowedRoles || allowedRoles.length === 0) return true;
  return hasRole(role, allowedRoles);
};
