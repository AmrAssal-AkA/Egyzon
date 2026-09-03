import { z } from "zod";
export declare const productBaseSchema: z.ZodObject<{
    productName: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    productDescription: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    price: z.ZodCoercedNumber<unknown>;
    category: z.ZodString;
    stock: z.ZodCoercedNumber<unknown>;
    discount: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>;
export declare const searchProductsSchema: z.ZodObject<{
    query: z.ZodObject<{
        q: z.ZodString;
        page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        category: z.ZodOptional<z.ZodString>;
        sort: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const createProductSchema: z.ZodObject<{
    body: z.ZodObject<{
        productName: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
        productDescription: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
        price: z.ZodCoercedNumber<unknown>;
        category: z.ZodString;
        stock: z.ZodCoercedNumber<unknown>;
        discount: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateProductSchema: z.ZodObject<{
    body: z.ZodObject<{
        productName: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
        productDescription: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
        price: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        category: z.ZodOptional<z.ZodString>;
        stock: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        discount: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>>;
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
export type SearchProductsSchemaType = z.infer<typeof searchProductsSchema>['query'];
//# sourceMappingURL=product.validate.d.ts.map