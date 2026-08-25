import type { Request, Response } from "express";
declare const createProduct: (req: Request, res: Response) => Promise<void>;
declare const applyDiscount: (req: Request, res: Response) => Promise<void>;
declare const getAllProducts: (req: Request, res: Response) => Promise<void>;
declare const getProductById: (req: Request, res: Response) => Promise<void>;
declare const updateProduct: (req: Request, res: Response) => Promise<void>;
declare const getSellerProducts: (req: Request, res: Response) => Promise<void>;
declare const deleteProduct: (req: Request, res: Response) => Promise<void>;
declare const _default: {
    createProduct: typeof createProduct;
    applyDiscount: typeof applyDiscount;
    getAllProducts: typeof getAllProducts;
    updateProduct: typeof updateProduct;
    getProductById: typeof getProductById;
    getSellerProducts: typeof getSellerProducts;
    deleteProduct: typeof deleteProduct;
};
export default _default;
//# sourceMappingURL=product.controller.d.ts.map