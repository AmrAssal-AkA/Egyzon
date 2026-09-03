import {z} from "zod";
import { sentizePlainText } from "../utils/senitize";

const safeTextSchema = z.string().regex(/^[a-zA-Z0-9\s]+$/, { message: "Only alphanumeric characters and spaces are allowed" });
const PasswordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[A-Z])\S+$/, {
        message: "Password must contain at least one uppercase letter.",
    });
const phoneNumberSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" });


export const userBaseSchema = z.object({
    FirstName: safeTextSchema.min(1, { message: "First name is required" }).transform(sentizePlainText),
    LastName: safeTextSchema.min(1, { message: "Last name is required" }).transform(sentizePlainText),
    email: z.string().email({ message: "Invalid email address" }),
});

export const RegisterSchema = z.object({
    body: z.object({
        FirstName: safeTextSchema.min(1, { message: "First name is required" }).transform(sentizePlainText),
        LastName: safeTextSchema.min(1, { message: "Last name is required" }).transform(sentizePlainText),
        email: z.string().email({ message: "Invalid email address" }),
        password: PasswordSchema,
    })
});

export const updateUserSchema = z.object({
    body: userBaseSchema.partial().extend({
        address: z.union([safeTextSchema, z.array(safeTextSchema).min(1)]).optional(),
        phoneNumber: phoneNumberSchema.optional(),
        isBlocked: z.boolean().optional(),
    })
});

export const LoginSchema = z.object({
    body: z.object({
        email: z.string().email ().transform(sentizePlainText),
        password: z.string().min(1, 'Password is required').transform(sentizePlainText),
    })
});


export const userResposnseSchema = z.object({
    role: z.enum(['customer', 'seller', 'admin']),
    address: z.array(safeTextSchema).transform((address) => address.map(sentizePlainText)),
    phoneNumber: z.array(phoneNumberSchema).transform((phoneNumbers) => phoneNumbers.map((phone) => phone)),
    isBlocked: z.boolean(),
    createdAt: z.date(),
})

export const forgetPasswordSchema = z.object({
    body: z.object({
        emailAddress: z.string().email({ message: "Invalid email address" }),
    })
})
export const resetPasswordSchema = z.object({
    body: z.object({
        newPassword: PasswordSchema,
        confirmNewPassword: PasswordSchema,
    })
})

export const adminLoginSchema = z.object({
    body: z.object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(1, 'Password is required'),
    })
})

export type ReagisterSchemaType = z.infer<typeof RegisterSchema>['body'];
export type LoginSchemaType = z.infer<typeof LoginSchema>['body'];
export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>['body'];
export type UserResposnseSchemaType = z.infer<typeof userResposnseSchema>;
