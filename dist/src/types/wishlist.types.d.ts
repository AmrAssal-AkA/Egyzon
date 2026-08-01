import { Types } from 'mongoose';
export interface IWishlist {
    userId: Types.ObjectId;
    productId: Types.ObjectId;
    createdAt: Date;
}
//# sourceMappingURL=wishlist.types.d.ts.map