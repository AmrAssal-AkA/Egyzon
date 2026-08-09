import type { Request, Response } from "express";
declare function createCart(req: Request, res: Response): Promise<void>;
declare const getCart: (req: Request, res: Response) => Promise<void>;
declare const removeCart: (req: Request, res: Response) => Promise<void>;
declare const _default: {
    createCart: typeof createCart;
    getCart: typeof getCart;
    removeCart: typeof removeCart;
};
export default _default;
//# sourceMappingURL=cart.controller.d.ts.map