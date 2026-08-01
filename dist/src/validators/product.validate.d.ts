import { z } from "zod";
export declare const productBaseSchema: z.ZodObject<{
    productName: z.ZodString;
    productDescription: z.ZodString;
    price: z.ZodNumber;
    category: z.ZodString;
    stock: z.ZodNumber;
}, z.core.$strip>;
export declare const createProductSchema: z.ZodObject<{
    body: z.ZodObject<{
        productName: z.ZodString;
        productDescription: z.ZodString;
        price: z.ZodNumber;
        category: z.ZodString;
        stock: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateProductSchema: z.ZodObject<{
    body: z.ZodObject<{
        productName: z.ZodOptional<z.ZodString>;
        productDescription: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodNumber>;
        category: z.ZodOptional<z.ZodString>;
        stock: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getAllProductsSchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreateProductSchemaType = z.infer<typeof createProductSchema>['body'];
export type UpdateProductSchemaType = z.infer<typeof updateProductSchema>['body'];
export type GetAllProductsSchemaType = z.infer<typeof getAllProductsSchema>['query'];
//# sourceMappingURL=product.validate.d.ts.map