import z from "zod";
export declare const setPlatformFeeSchema: z.ZodObject<{
    feePercentage: z.ZodNumber;
    taxRate: z.ZodNumber;
}, z.core.$strip>;
export type SetPlatformFeeInput = z.infer<typeof setPlatformFeeSchema>;
//# sourceMappingURL=admin.validate.d.ts.map