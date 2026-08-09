import {z} from "zod";

const typeTextRegex = z.string().regex(/^[a-zA-Z0-9\s-]+$/, { message: "Only alphanumeric characters, spaces, and hyphens are allowed" });
const multerFileSchema = z.object({
    originalname: z.string(),
    mimetype: z.string(),
    buffer: z.instanceof(Buffer),
    size: z.number(),
});


export const sellerBaseSchema = z.object({
    body: z.object({
        storeName: z.string().min(1, { message: "Store name is required" }),
        commercialRegisterNumber: z.string().min(1, { message: "Commercial register number is required" }),
        taxCardNumber: z.string().min(1, { message: "Tax card number is required" }),
    }),
    files: z.object({
         commercialRegisterImage: z.array(multerFileSchema, { message: "Commercial register image is required" }).min(1, {message: "Commercial register image is required"}),
         taxCardImage: z.array(multerFileSchema, { message: "Tax card image is required" }).min(1, {message: "Tax card image is required"}),
    })
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