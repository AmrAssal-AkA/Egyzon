"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsSchema = exports.updateProductSchema = exports.createProductSchema = exports.searchProductsSchema = exports.productBaseSchema = void 0;
const zod_1 = require("zod");
const senitize_1 = require("../utils/senitize");
exports.productBaseSchema = zod_1.z.object({
    productName: zod_1.z.string().min(1, { message: "Name is required" }).transform(senitize_1.sentizePlainText),
    productDescription: zod_1.z.string().min(1, { message: "Description is required" }).transform(senitize_1.sentizeRichText),
    price: zod_1.z.coerce.number().min(0, { message: "Price must be a positive number" }),
    category: zod_1.z.string().min(1, { message: "Category is required" }),
    stock: zod_1.z.coerce.number().min(0, { message: "Stock must be a positive number" }),
    discount: zod_1.z.coerce.number().min(0).max(100).optional().default(0),
});
exports.searchProductsSchema = zod_1.z.object({
    query: zod_1.z.object({
        q: zod_1.z.string().min(1, { message: "Search query is required" }),
        page: zod_1.z.coerce.number().int().positive().default(1),
        limit: zod_1.z.coerce.number().int().positive().max(100).default(10),
        category: zod_1.z.string().trim().min(1).optional(),
        sort: zod_1.z.string().regex(/^(price|productName|createdAt):(asc|desc)$/, { message: "Invalid sort format. Use format: field:(asc|desc)" }).optional(),
    }),
});
exports.createProductSchema = zod_1.z.object({
    body: exports.productBaseSchema,
});
exports.updateProductSchema = zod_1.z.object({
    body: exports.productBaseSchema.partial(),
});
exports.getAllProductsSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.coerce.number().int().positive().default(1),
        limit: zod_1.z.coerce.number().int().positive().max(100).default(10),
    }),
});
//# sourceMappingURL=product.validate.js.map