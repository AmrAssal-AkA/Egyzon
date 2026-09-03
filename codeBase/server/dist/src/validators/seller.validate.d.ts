import { z } from "zod";
export declare const sellerBaseSchema: z.ZodObject<{
    body: z.ZodObject<{
        storeName: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
        commercialRegisterNumber: z.ZodString;
        taxCardNumber: z.ZodString;
    }, z.core.$strip>;
    files: z.ZodObject<{
        commercialRegisterImage: z.ZodArray<z.ZodObject<{
            originalname: z.ZodString;
            mimetype: z.ZodString;
            buffer: z.ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>;
            size: z.ZodNumber;
        }, z.core.$strip>>;
        taxCardImage: z.ZodArray<z.ZodObject<{
            originalname: z.ZodString;
            mimetype: z.ZodString;
            buffer: z.ZodCustom<Buffer<ArrayBufferLike>, Buffer<ArrayBufferLike>>;
            size: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const sellerSetupStoreSchema: z.ZodObject<{
    body: z.ZodObject<{
        storeDescription: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
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