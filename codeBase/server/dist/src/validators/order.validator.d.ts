import { z } from "zod";
export declare const orderBaseSchema: z.ZodObject<{
    body: z.ZodObject<{
        shippingAddress: z.ZodString;
        paymentMethod: z.ZodEnum<{
            cashOnDelivery: "cashOnDelivery";
            creditCard: "creditCard";
        }>;
        notes: z.ZodOptional<z.ZodString>;
        Address: z.ZodObject<{
            address1: z.ZodString;
            address2: z.ZodOptional<z.ZodString>;
            city: z.ZodString;
            state: z.ZodString;
            postalCode: z.ZodString;
            country: z.ZodString;
        }, z.core.$strip>;
        phoneNumber: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type OrderBaseSchema = z.infer<typeof orderBaseSchema>;
//# sourceMappingURL=order.validator.d.ts.map