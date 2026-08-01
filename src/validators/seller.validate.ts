import {z} from "zod";

const typeTextRegex = z.string().regex(/^[a-zA-Z0-9\s]+$/, { message: "Only alphanumeric characters and spaces are allowed" });


export const sellerBaseSchema = z.object({
    storeName:typeTextRegex.min(1, { message: "Store name is required" }),
    commercialRegisterNumber: typeTextRegex.min(1, { message: "Commercial register number is required" }),
    taxCardNumber: typeTextRegex.min(1, { message: "Tax card number is required" }),
    commercialRegisterImage: z.instanceof(File, { message: "Commercial register image is required" }),
    taxCardImage: z.instanceof(File, { message: "Tax card image is required" }),
})

export const sellerSetupStoreSchema = z.object({
    body: z.object({
        storeDescription: typeTextRegex.min(1, { message: "Store description is required" }),
        storeLogo: z.instanceof(File, { message: "Store logo is required" }),
        storeBanner: z.instanceof(File, { message: "Store banner is required" }),
        storeType: z.enum(["physical", "online", "both"], { message: "Store type is required" }),
        storephysicalAddress: z.string().optional(),
        storeOnlineAddress: z.string().optional(),
    })
})