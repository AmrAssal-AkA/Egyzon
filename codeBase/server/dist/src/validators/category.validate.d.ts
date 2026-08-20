import { z } from 'zod';
export declare const categoryBaseSchema: z.ZodObject<{
    categoryName: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodString;
    image: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createCategorySchema: z.ZodObject<{
    body: z.ZodObject<{
        categoryName: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodString;
        image: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getAllCategoriesSchema: z.ZodObject<{
    query: z.ZodOptional<z.ZodObject<{
        page: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        sortBy: z.ZodOptional<z.ZodString>;
        order: z.ZodOptional<z.ZodEnum<{
            asc: "asc";
            desc: "desc";
        }>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type CreateCategoryInput = z.infer<typeof categoryBaseSchema>;
export type GetAllCategoriesInput = z.infer<typeof getAllCategoriesSchema>;
//# sourceMappingURL=category.validate.d.ts.map