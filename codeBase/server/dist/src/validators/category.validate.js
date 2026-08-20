"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategoriesSchema = exports.createCategorySchema = exports.categoryBaseSchema = void 0;
const zod_1 = require("zod");
const categoryInputRegex = /^[a-zA-Z0-9\s]+$/; //
exports.categoryBaseSchema = zod_1.z.object({
    categoryName: zod_1.z.string().min(1, 'Category name is required').regex(categoryInputRegex, 'Invalid category name').optional(),
    name: zod_1.z.string().min(1, 'Category name is required').regex(categoryInputRegex, 'Invalid category name').optional(),
    description: zod_1.z.string().min(1, 'Description is required').regex(categoryInputRegex, 'Invalid description'),
    image: zod_1.z.string().optional(),
}).refine((data) => !!(data.categoryName || data.name), {
    message: 'Category name is required',
    path: ['categoryName'],
});
exports.createCategorySchema = zod_1.z.object({
    body: exports.categoryBaseSchema,
});
exports.getAllCategoriesSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.coerce.number().int().positive().optional(),
        limit: zod_1.z.coerce.number().int().positive().optional(),
        sortBy: zod_1.z.string().optional(),
        order: zod_1.z.enum(['asc', 'desc']).optional(),
    }).optional(),
});
//# sourceMappingURL=category.validate.js.map