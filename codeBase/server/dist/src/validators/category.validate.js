"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategoriesSchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
const categoryInputRegex = /^[a-zA-Z0-9\s]+$/;
exports.createCategorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required').regex(categoryInputRegex, 'Invalid category name'),
    description: zod_1.z.string().min(1, 'Description is required').regex(categoryInputRegex, 'Invalid description'),
    image: zod_1.z.string().optional(),
});
exports.getAllCategoriesSchema = zod_1.z.object({
    page: zod_1.z.number().int().positive().optional(),
    limit: zod_1.z.number().int().positive().optional(),
    sortBy: zod_1.z.string().optional(),
    order: zod_1.z.enum(['asc', 'desc']).optional(),
});
//# sourceMappingURL=category.validate.js.map