import type { Request, Response } from "express";
export declare const AdminController: {
    getAllUsers: (req: Request, res: Response) => Promise<void>;
    promoteToAdmin: (req: Request, res: Response) => Promise<void>;
    BlockUser: (req: Request, res: Response) => Promise<void>;
    activateUser: (req: Request, res: Response) => Promise<void>;
    setPlatformFee: (req: Request, res: Response) => Promise<void>;
    getPlatformFee: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=Admin.controller.d.ts.map