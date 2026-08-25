import { AxiosError } from "axios";
import { serverClient } from "../lib/serverClient";
import type {
  ApiResponse,
  IPlatformConfig,
  SetPlatformConfigPayload,
} from "../types/platformConfig";

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      fallback
    );
  }

  return fallback;
}

export interface SetPlatformConfigParams {
  feePercentage?: number;
  baseFee?: number;
  platformFeePercentage?: number;
  PlatformFeePercentage?: number;
  taxRate?: number;
  TaxRate?: number;
  platformTaxRate?: number;
}

export const setPlatformConfig = async (
  config: SetPlatformConfigParams
): Promise<ApiResponse<IPlatformConfig>> => {
  try {
    const rawFee =
      config.feePercentage ??
      config.baseFee ??
      config.platformFeePercentage ??
      config.PlatformFeePercentage ??
      0;

    const rawTax =
      config.taxRate ??
      config.TaxRate ??
      config.platformTaxRate ??
      0;

    const feePercentage = Number(rawFee);
    const taxRate = Number(rawTax);

    const payload: SetPlatformConfigPayload = {
      feePercentage,
      taxRate,
    };

    const { data } = await serverClient.post<ApiResponse<IPlatformConfig>>(
      "/setPlatformFee",
      payload
    );
    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to update platform configuration"),
    };
  }
};

export const getPlatformConfig = async (): Promise<ApiResponse<IPlatformConfig>> => {
  try {
    const { data } = await serverClient.get<ApiResponse<IPlatformConfig>>(
      "/getPlatformFee"
    );
    return data;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Failed to fetch platform configuration"),
    };
  }
};