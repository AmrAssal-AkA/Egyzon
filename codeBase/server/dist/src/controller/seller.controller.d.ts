import type { Request, Response } from "express";
export declare const SellerController: {
    getTotalProducts: (req: Request, res: Response) => Promise<void>;
    getTotalOrders: (req: Request, res: Response) => Promise<void>;
    getTotalRevenue: (req: Request, res: Response) => Promise<void>;
    getTopSellingProducts: (req: Request, res: Response) => Promise<void>;
    getAllOrders: (req: Request, res: Response) => Promise<void>;
    totalInventoryValue: (req: Request, res: Response) => Promise<void>;
    changeOrderStatus: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=seller.controller.d.ts.map