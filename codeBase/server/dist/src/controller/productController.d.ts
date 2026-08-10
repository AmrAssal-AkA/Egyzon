import type { Request, Response } from "express";
declare const createProduct: (req: Request, res: Response) => Promise<void>;
declare const applyDiscount: (req: Request, res: Response) => Promise<void>;
declare const getAllProducts: (req: Request, res: Response) => Promise<void>;
declare const _default: {
    createProduct: typeof createProduct;
    applyDiscount: typeof applyDiscount;
    getAllProducts: typeof getAllProducts;
};
export default _default;
//# sourceMappingURL=productController.d.ts.map