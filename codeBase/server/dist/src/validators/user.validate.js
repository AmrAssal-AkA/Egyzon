"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLoginSchema = exports.resetPasswordSchema = exports.forgetPasswordSchema = exports.userResposnseSchema = exports.LoginSchema = exports.updateUserSchema = exports.RegisterSchema = exports.userBaseSchema = void 0;
const zod_1 = require("zod");
const safeTextSchema = zod_1.z.string().regex(/^[a-zA-Z0-9\s]+$/, { message: "Only alphanumeric characters and spaces are allowed" });
const PasswordSchema = zod_1.z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[A-Z])\S+$/, {
    message: "Password must contain at least one uppercase letter.",
});
const phoneNumberSchema = zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" });
exports.userBaseSchema = zod_1.z.object({
    FirstName: safeTextSchema.min(1, { message: "First name is required" }),
    LastName: safeTextSchema.min(1, { message: "Last name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
});
exports.RegisterSchema = zod_1.z.object({
    body: zod_1.z.object({
        FirstName: safeTextSchema.min(1, { message: "First name is required" }),
        LastName: safeTextSchema.min(1, { message: "Last name is required" }),
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        password: PasswordSchema,
    })
});
exports.updateUserSchema = zod_1.z.object({
    body: exports.userBaseSchema.partial().extend({
        address: zod_1.z.union([safeTextSchema, zod_1.z.array(safeTextSchema).min(1)]).optional(),
        phoneNumber: phoneNumberSchema.optional(),
        isBlocked: zod_1.z.boolean().optional(),
    })
});
exports.LoginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(1, 'Password is required'),
    })
});
exports.userResposnseSchema = zod_1.z.object({
    role: zod_1.z.enum(['customer', 'seller', 'admin']),
    address: zod_1.z.array(safeTextSchema),
    phoneNumber: zod_1.z.array(phoneNumberSchema),
    isBlocked: zod_1.z.boolean(),
    createdAt: zod_1.z.date(),
});
exports.forgetPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        emailAddress: zod_1.z.string().email({ message: "Invalid email address" }),
    })
});
exports.resetPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        newPassword: PasswordSchema,
        confirmNewPassword: PasswordSchema,
    })
});
exports.adminLoginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        password: zod_1.z.string().min(1, 'Password is required'),
    })
});
//# sourceMappingURL=user.validate.js.map