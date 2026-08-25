export interface IPlatformConfig {
  feePercentage?: number;
  PlatformFeePercentage?: number;
  platformFeePercentage?: number;
  taxRate?: number;
  TaxRate?: number;
  platformTaxRate?: number;
  updatedBy?: string;
  updateAt?: Date | string;
  updatedAt?: Date | string;
}

export interface SetPlatformConfigPayload {
  feePercentage: number;
  taxRate: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}