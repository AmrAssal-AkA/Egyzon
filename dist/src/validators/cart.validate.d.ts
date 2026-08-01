import { z } from 'zod';
export declare const cartSchema: z.ZodObject<{
    body: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            productId: z.ZodString;
            quantity: z.ZodNumber;
            price: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
//# sourceMappingURL=cart.validate.d.ts.map