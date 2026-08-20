"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProductsSchema = exports.updateProductSchema = exports.createProductSchema = exports.productBaseSchema = void 0;
const zod_1 = require("zod");
exports.productBaseSchema = zod_1.z.object({
    productName: zod_1.z.string().min(1, { message: "Name is required" }),
    productDescription: zod_1.z.string().min(1, { message: "Description is required" }),
    price: zod_1.z.coerce.number().min(0, { message: "Price must be a positive number" }),
    category: zod_1.z.string().min(1, { message: "Category is required" }),
    stock: zod_1.z.coerce.number().min(0, { message: "Stock must be a positive number" }),
    discount: zod_1.z.coerce.number().min(0).max(100).optional().default(0),
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