import {z} from 'zod';

export const cartSchema = z.object({
body: z.object({
    items: z.array(z.object({
        productId: z.string(),
        quantity: z.number().min(1, 'Quantity must be at least 1'),
        price: z.number().min(0, 'Price must be a positive number'),
    })),
}),
})