import {z} from "zod";

export const sellerBaseSchema = z.object({
    storeName: z.string().min(1, { message: "Store name is required" }),
    commercialRegisterNumber: z.string().min(1, { message: "Commercial register number is required" }),
    taxCardNumber: z.string().min(1, { message: "Tax card number is required" }),
    commercialRegisterImage: z.instanceof(File, { message: "Commercial register image is required" }),
    taxCardImage: z.instanceof(File, { message: "Tax card image is required" }),
})

export const sellerSetupStoreSchema = z.object({
    body: z.object({
        storeDescription: z.string().min(1, { message: "Store description is required" }),
        storeLogo: z.instanceof(File, { message: "Store logo is required" }),
        storeBanner: z.instanceof(File, { message: "Store banner is required" }),
        storeType: z.enum(["physical", "online", "both"], { message: "Store type is required" }),
        storephysicalAddress: z.string().optional(),
        storeOnlineAddress: z.string().optional(),
    })
})