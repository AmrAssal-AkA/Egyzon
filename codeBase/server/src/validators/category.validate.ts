import {z} from 'zod';

const categoryInputRegex = /^[a-zA-Z0-9\s]+$/; //


export const categoryBaseSchema = z.object({
  categoryName: z.string().min(1, 'Category name is required').regex(categoryInputRegex, 'Invalid category name').optional(),
  name: z.string().min(1, 'Category name is required').regex(categoryInputRegex, 'Invalid category name').optional(),
  description: z.string().min(1, 'Description is required').regex(categoryInputRegex, 'Invalid description'),
  image: z.string().optional(),
}).refine((data) => !!(data.categoryName || data.name), {
  message: 'Category name is required',
  path: ['categoryName'],
});

export const createCategorySchema = z.object({
  body: categoryBaseSchema,
});


export const getAllCategoriesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional(),
    sortBy: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional(),
  }).optional(),
});

export type CreateCategoryInput = z.infer<typeof categoryBaseSchema>;
export type GetAllCategoriesInput = z.infer<typeof getAllCategoriesSchema>;