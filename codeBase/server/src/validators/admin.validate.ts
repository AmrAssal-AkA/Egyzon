import z from "zod";

export const setPlatformFeeSchema = z.object({
  feePercentage: z.number().min(0, "feePercentage must be at least 0").max(100, "feePercentage must be at most 100"),
  taxRate: z.number().min(0, "taxRate must be at least 0").max(100, "taxRate must be at most 100"),
});


export type SetPlatformFeeInput = z.infer<typeof setPlatformFeeSchema>;