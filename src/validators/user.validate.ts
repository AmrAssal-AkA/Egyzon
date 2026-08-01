import {z} from "zod";

const safeTextSchema = z.string().regex(/^[a-zA-Z0-9\s]+$/, { message: "Only alphanumeric characters and spaces are allowed" });
const PasswordSchema = z.string().min(8, { message: "Password must be at least 8 characters long" }).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/, { message: "Password must contain at least one letter and one number" });

export const userBaseSchema = z.object({
    FirstName: safeTextSchema.min(1, { message: "First name is required" }),
    LastName: safeTextSchema.min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
});

export const RegisterSchema = z.object({
    body: z.object({
        FirstName: safeTextSchema.min(1, { message: "First name is required" }),
        LastName: safeTextSchema.min(1, { message: "Last name is required" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: PasswordSchema,
        confirmPassword: PasswordSchema,
    })
});

export const updateUserSchema = z.object({
    body: userBaseSchema.partial().extend({
        address: safeTextSchema.optional(),
        phoneNumber: safeTextSchema.optional(),
        isBlocked: z.boolean().optional(),
    })
});

export const LoginSchema = z.object({
    body: z.object({
        email: z.string().email (),
        password: z.string().min(1, 'Password is required'),
    })
});


export const userResposnseSchema = z.object({
    role: z.enum(['customer', 'seller', 'admin']),
    address: z.array(safeTextSchema),
    phoneNumber: z.array(safeTextSchema),
    isBlocked: z.boolean(),
    createdAt: z.date(),
})

export type ReagisterSchemaType = z.infer<typeof RegisterSchema>['body'];
export type LoginSchemaType = z.infer<typeof LoginSchema>['body'];
export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>['body'];
export type UserResposnseSchemaType = z.infer<typeof userResposnseSchema>;