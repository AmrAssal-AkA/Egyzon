import {z} from "zod";


export const productBaseSchema = z.object({
    productName: z.string().min(1, { message: "Name is required" }),
    productDescription: z.string().min(1, { message: "Description is required" }),
    price: z.number().min(0, { message: "Price must be a positive number" }),
    category: z.string().min(1, { message: "Category is required" }),
    stock: z.number().min(0, { message: "Stock must be a positive number" }),
});

export const createProductSchema = z.object({
    body: productBaseSchema,
});

export const updateProductSchema = z.object({
    body: productBaseSchema.partial(),
});

export const getAllProductsSchema = z.object({
    query: z.object({
        page: z.coerce.number().int().positive().default(1),
        limit: z.coerce.number().int().positive().max(100).default(10),
    }),
});

export type CreateProductSchemaType = z.infer<typeof createProductSchema>['body'];
export type UpdateProductSchemaType = z.infer<typeof updateProductSchema>['body'];
export type GetAllProductsSchemaType = z.infer<typeof getAllProductsSchema>['query'];