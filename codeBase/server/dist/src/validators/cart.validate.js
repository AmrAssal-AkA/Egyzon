"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartSchema = void 0;
const zod_1 = require("zod");
exports.cartSchema = zod_1.z.object({
    body: zod_1.z.object({
        items: zod_1.z.array(zod_1.z.object({
            productId: zod_1.z.string(),
            quantity: zod_1.z.number().min(1, 'Quantity must be at least 1'),
            price: zod_1.z.number().min(0, 'Price must be a positive number'),
        })),
    }),
});
//# sourceMappingURL=cart.validate.js.map