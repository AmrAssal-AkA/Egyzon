import {z} from 'zod';

const categoryInputRegex = /^[a-zA-Z0-9\s]+$/;


export const createCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').regex(categoryInputRegex, 'Invalid category name'),
  description: z.string().min(1, 'Description is required').regex(categoryInputRegex, 'Invalid description'),
  image: z.string().optional(),
});


export const getAllCategoriesSchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
  sortBy: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type GetAllCategoriesInput = z.infer<typeof getAllCategoriesSchema>;