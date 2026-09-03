import { z } from "zod";
export declare const userBaseSchema: z.ZodObject<{
    FirstName: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    LastName: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    email: z.ZodString;
}, z.core.$strip>;
export declare const RegisterSchema: z.ZodObject<{
    body: z.ZodObject<{
        FirstName: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
        LastName: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateUserSchema: z.ZodObject<{
    body: z.ZodObject<{
        FirstName: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
        LastName: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
        email: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>>;
        phoneNumber: z.ZodOptional<z.ZodString>;
        isBlocked: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const LoginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
        password: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const userResposnseSchema: z.ZodObject<{
    role: z.ZodEnum<{
        admin: "admin";
        customer: "customer";
        seller: "seller";
    }>;
    address: z.ZodPipe<z.ZodArray<z.ZodString>, z.ZodTransform<string[], string[]>>;
    phoneNumber: z.ZodPipe<z.ZodArray<z.ZodString>, z.ZodTransform<string[], string[]>>;
    isBlocked: z.ZodBoolean;
    createdAt: z.ZodDate;
}, z.core.$strip>;
export declare const forgetPasswordSchema: z.ZodObject<{
    body: z.ZodObject<{
        emailAddress: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const resetPasswordSchema: z.ZodObject<{
    body: z.ZodObject<{
        newPassword: z.ZodString;
        confirmNewPassword: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const adminLoginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type ReagisterSchemaType = z.infer<typeof RegisterSchema>['body'];
export type LoginSchemaType = z.infer<typeof LoginSchema>['body'];
export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>['body'];
export type UserResposnseSchemaType = z.infer<typeof userResposnseSchema>;
//# sourceMappingURL=user.validate.d.ts.map