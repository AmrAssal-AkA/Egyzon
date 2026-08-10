import type { Request, Response } from 'express';
declare const addToWishlist: (req: Request, res: Response) => Promise<void>;
declare const removeFromWishlist: (req: Request, res: Response) => Promise<void>;
declare const getWishlist: (req: Request, res: Response) => Promise<void>;
export { addToWishlist, removeFromWishlist, getWishlist };
//# sourceMappingURL=wishlistController.d.ts.map