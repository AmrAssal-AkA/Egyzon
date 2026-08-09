import { z } from 'zod';
export declare const createCategorySchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    image: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const getAllCategoriesSchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodNumber>;
    limit: z.ZodOptional<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type GetAllCategoriesInput = z.infer<typeof getAllCategoriesSchema>;
//# sourceMappingURL=category.validate.d.ts.map