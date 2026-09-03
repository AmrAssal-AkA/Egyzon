import {z} from "zod";
import { sentizeRichText, sentizePlainText } from "../utils/senitize";

export const productBaseSchema = z.object({
    productName: z.string().min(1, { message: "Name is required" }).transform(sentizePlainText),
    productDescription: z.string().min(1, { message: "Description is required" }).transform(sentizeRichText),
    price: z.coerce.number().min(0, { message: "Price must be a positive number" }),
    category: z.string().min(1, { message: "Category is required" }),
    stock: z.coerce.number().min(0, { message: "Stock must be a positive number" }),
    discount: z.coerce.number().min(0).max(100).optional().default(0),
});

export const searchProductsSchema = z.object({
    query: z.object({
        q: z.string().min(1, { message: "Search query is required" }),
        page: z.coerce.number().int().positive().default(1),
        limit: z.coerce.number().int().positive().max(100).default(10),
        category: z.string().trim().min(1).optional(),
        sort: z.string().regex(/^(price|productName|createdAt):(asc|desc)$/, { message: "Invalid sort format. Use format: field:(asc|desc)" }).optional(),
    }),
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
export type SearchProductsSchemaType = z.infer<typeof searchProductsSchema>['query'];