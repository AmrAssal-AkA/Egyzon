import { z } from "zod";
export declare const sellerBaseSchema: z.ZodObject<{
    body: z.ZodObject<{
        storeName: z.ZodString;
        commercialRegisterNumber: z.ZodString;
        taxCardNumber: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const sellerSetupStoreSchema: z.ZodObject<{
    body: z.ZodObject<{
        storeDescription: z.ZodString;
        storeLogo: z.ZodCustom<File, File>;
        storeBanner: z.ZodCustom<File, File>;
        storeType: z.ZodEnum<{
            both: "both";
            online: "online";
            physical: "physical";
        }>;
        storephysicalAddress: z.ZodOptional<z.ZodString>;
        storeOnlineAddress: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=seller.validate.d.ts.map