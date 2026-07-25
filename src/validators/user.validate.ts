import {z} from "zod";


export const userBaseSchema = z.object({
    FirstName: z.string().min(1, { message: "First name is required" }),
    LastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
});

export const RegisterSchema = z.object({
    body: z.object({
        FirstName: z.string().min(1, { message: "First name is required" }),
        LastName: z.string().min(1, { message: "Last name is required" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    })
});

export const updateUserSchema = z.object({
    body: userBaseSchema.partial().extend({
        address: z.array(z.string()).optional(),
        phoneNumber: z.string().optional(),
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
    address: z.array(z.string()),
    isBlocked: z.boolean(),
    createdAt: z.date(),
})

export type ReagisterSchemaType = z.infer<typeof RegisterSchema>['body'];
export type LoginSchemaType = z.infer<typeof LoginSchema>['body'];
export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>['body'];
export type UserResposnseSchemaType = z.infer<typeof userResposnseSchema>;