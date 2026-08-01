import { IWishlist } from "../types/wishlist.types";
export declare const WishlistServices: {
    addToWishlist: (userId: string, productId: string) => Promise<import("mongoose").Document<unknown, {}, IWishlist, {}, import("mongoose").DefaultSchemaOptions> & IWishlist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    removeFromWishlist: (userId: string, productId: string) => Promise<(import("mongoose").Document<unknown, {}, IWishlist, {}, import("mongoose").DefaultSchemaOptions> & IWishlist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getWishlist: (userId: string) => Promise<(import("mongoose").Document<unknown, {}, IWishlist, {}, import("mongoose").DefaultSchemaOptions> & IWishlist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
};
//# sourceMappingURL=wishlist.services.d.ts.map