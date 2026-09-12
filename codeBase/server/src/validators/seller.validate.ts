import {z} from "zod";

import { sentizeRichText, sentizePlainText } from "../utils/senitize";
import { paymobBankCode, paymobIssuar } from "../types/wallet.types";

const typeTextRegex = z.string().regex(/^[a-zA-Z0-9\s-. , ']+$/, { message: "Only alphanumeric characters, spaces, hyphens, periods, commas, and apostrophes are allowed" });
const multerFileSchema = z.object({
    originalname: z.string(),
    mimetype: z.string(),
    buffer: z.instanceof(Buffer),
    size: z.number(),
});


export const sellerBaseSchema = z.object({
    body: z.object({
        storeName: z.string().min(1, { message: "Store name is required" }).transform(sentizePlainText),
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
        storeDescription: typeTextRegex.min(1, { message: "Store description is required" }).transform(sentizeRichText),
        storeType: z.enum(["physical", "online", "both"], { message: "Store type is required" }),
        storephysicalAddress: z.string().optional(),
    }),
    files: z.object({
        storeLogo: z.array(multerFileSchema, { message: "Store logo is required" }).min(1, {message: "Store logo is required"}),
        storeBanner: z.array(multerFileSchema, { message: "Store banner is required" }).min(1, {message: "Store banner is required"}),
    })
})

export const addBankAccountRequestSchema = z.object({
    body: z.object({
    issuer: z.nativeEnum(paymobIssuar).default(paymobIssuar.BANK_CARD),
    fullName: z.string().trim().min(3, "Full name must match the bank account holder"),
    bankCardNumber: z.string().trim().regex(/^\d{10,34}$/, "Bank card/account number must be numeric, 10-34 digits"),
    bankCode: z.nativeEnum(paymobBankCode)
    })
})
export const addBankAccountSchema = z.object({
    issuer: z.nativeEnum(paymobIssuar).default(paymobIssuar.BANK_CARD),
    fullName: z.string().trim().min(3, "Full name must match the bank account holder"),
    bankCardNumber: z.string().trim().regex(/^\d{10,34}$/, "Bank card/account number must be numeric, 10-34 digits"),
    bankCode: z.nativeEnum(paymobBankCode)
})


export type addBankAccountInput = z.infer<typeof addBankAccountSchema>;