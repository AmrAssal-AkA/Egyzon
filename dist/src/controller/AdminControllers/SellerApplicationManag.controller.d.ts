import type { Request, Response } from "express";
export declare const ManageSellerApplicationsController: {
    getAllSellers: (req: Request, res: Response) => Promise<void>;
    getAllPendingSellerApplications: (req: Request, res: Response) => Promise<void>;
    approveSeller: (req: Request, res: Response) => Promise<void>;
    requestAdditionalDocuments: (req: Request, res: Response) => Promise<void>;
    rejectseller: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=SellerApplicationManag.controller.d.ts.map