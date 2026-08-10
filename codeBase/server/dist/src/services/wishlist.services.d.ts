export declare const WishlistServices: {
    addToWishlist: (userId: string, productId: string) => Promise<import("mongoose").Document<unknown, {}, import("../types/wishlist.types").IWishlist, {}, import("mongoose").DefaultSchemaOptions> & import("../types/wishlist.types").IWishlist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    removeFromWishlist: (userId: string, productId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../types/wishlist.types").IWishlist, {}, import("mongoose").DefaultSchemaOptions> & import("../types/wishlist.types").IWishlist & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getWishlist: (userId: string) => Promise<{
        userId: import("mongoose").Types.ObjectId;
        productId: any[];
    } | undefined>;
    MoveToCart: (userId: string, productId: string) => Promise<{
        addToCart: number;
        removeWishlist: (import("mongoose").Document<unknown, {}, import("../types/wishlist.types").IWishlist, {}, import("mongoose").DefaultSchemaOptions> & import("../types/wishlist.types").IWishlist & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }) | null;
    }>;
};
//# sourceMappingURL=wishlist.services.d.ts.map