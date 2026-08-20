import {z} from "zod";

const typeTextRegex = z.string().regex(/^[a-zA-Z0-9\s-]+$/, { message: "Only alphanumeric characters, spaces, and hyphens are allowed" });
 const phoneNumberSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" });
 
export const orderBaseSchema = z.object({
     body: z.object({
        shippingAddress: typeTextRegex.min(5, { message: "Shipping address must be at least 5 characters long" }),
        paymentMethod: z.enum(["cashOnDelivery", "creditCard"], { message: "Invalid payment method" }),
        notes: typeTextRegex.max(200, { message: "Notes must be at most 200 characters long" }).optional(),
        Address: z.object({
            address1: typeTextRegex.min(5, { message: "Address line 1 must be at least 5 characters long" }),
            address2: typeTextRegex.min(5, { message: "Address line 2 must be at least 5 characters long" }).optional(),
            city: typeTextRegex.min(2, { message: "City must be at least 2 characters long" }),
            state: typeTextRegex.min(2, { message: "State must be at least 2 characters long" }),
            postalCode: typeTextRegex.min(5, { message: "Postal code must be at least 5 characters long" }),
            country: typeTextRegex.min(2, { message: "Country must be at least 2 characters long" })
        }),
        phoneNumber: phoneNumberSchema.optional(),
     })
})

export type OrderBaseSchema = z.infer<typeof orderBaseSchema>;