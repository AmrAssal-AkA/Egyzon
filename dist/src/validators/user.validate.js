"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResposnseSchema = exports.LoginSchema = exports.updateUserSchema = exports.RegisterSchema = exports.userBaseSchema = void 0;
const zod_1 = require("zod");
exports.userBaseSchema = zod_1.z.object({
    FirstName: zod_1.z.string().min(1, { message: "First name is required" }),
    LastName: zod_1.z.string().min(1, { message: "Last name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
});
exports.RegisterSchema = zod_1.z.object({
    body: zod_1.z.object({
        FirstName: zod_1.z.string().min(1, { message: "First name is required" }),
        LastName: zod_1.z.string().min(1, { message: "Last name is required" }),
        email: zod_1.z.string().email({ message: "Invalid email address" }),
        password: zod_1.z.string().min(8, { message: "Password must be at least 8 characters long" }),
    })
});
exports.updateUserSchema = zod_1.z.object({
    body: exports.userBaseSchema.partial().extend({
        address: zod_1.z.array(zod_1.z.string()).optional(),
        phoneNumber: zod_1.z.string().optional(),
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
    address: zod_1.z.array(zod_1.z.string()),
    isBlocked: zod_1.z.boolean(),
    createdAt: zod_1.z.date(),
});
//# sourceMappingURL=user.validate.js.map