"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderBaseSchema = void 0;
const zod_1 = require("zod");
const typeTextRegex = zod_1.z.string().regex(/^[a-zA-Z0-9\s-]+$/, { message: "Only alphanumeric characters, spaces, and hyphens are allowed" });
const phoneNumberSchema = zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" });
exports.orderBaseSchema = zod_1.z.object({
    body: zod_1.z.object({
        shippingAddress: typeTextRegex.min(5, { message: "Shipping address must be at least 5 characters long" }),
        paymentMethod: zod_1.z.enum(["cashOnDelivery", "creditCard"], { message: "Invalid payment method" }),
        notes: typeTextRegex.max(200, { message: "Notes must be at most 200 characters long" }).optional(),
        Address: zod_1.z.object({
            address1: typeTextRegex.min(5, { message: "Address line 1 must be at least 5 characters long" }),
            address2: typeTextRegex.min(5, { message: "Address line 2 must be at least 5 characters long" }).optional(),
            city: typeTextRegex.min(2, { message: "City must be at least 2 characters long" }),
            state: typeTextRegex.min(2, { message: "State must be at least 2 characters long" }),
            postalCode: typeTextRegex.min(5, { message: "Postal code must be at least 5 characters long" }),
            country: typeTextRegex.min(2, { message: "Country must be at least 2 characters long" })
        }),
        billingData: zod_1.z.object({
            firstName: zod_1.z.string().min(1, { message: "Billing first name is required" }),
            lastName: zod_1.z.string().min(1, { message: "Billing last name is required" }),
            email: zod_1.z.string().email({ message: "Invalid billing email" }),
            phoneNumber: phoneNumberSchema,
            apartment: zod_1.z.string().optional(),
            floor: zod_1.z.string().optional(),
            street: zod_1.z.string().optional(),
            building: zod_1.z.string().optional(),
            city: zod_1.z.string().optional(),
            state: zod_1.z.string().optional(),
            country: zod_1.z.string().optional(),
            postalCode: zod_1.z.string().optional(),
        }).optional(),
        phoneNumber: phoneNumberSchema.optional(),
    })
});
//# sourceMappingURL=order.validator.js.map