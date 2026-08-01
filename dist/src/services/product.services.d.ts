export declare const ProductServices: {
    createProduct: (sellerId: string, productData: any) => Promise<import("mongoose").Document<unknown, {}, import("../types/product.types").IProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../types/product.types").IProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    ApplyDiscount: (SellerId: string, productId: string, discount: number) => Promise<import("mongoose").Document<unknown, {}, import("../types/product.types").IProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../types/product.types").IProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    UpdateProduct: (SellerId: string, productId: string, productData: any) => Promise<import("mongoose").Document<unknown, {}, import("../types/product.types").IProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../types/product.types").IProduct & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    getAllProducts: (page: number, limit: number) => Promise<{
        products: (import("mongoose").Document<unknown, {}, import("../types/product.types").IProduct, {}, import("mongoose").DefaultSchemaOptions> & import("../types/product.types").IProduct & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
    }>;
};
//# sourceMappingURL=product.services.d.ts.map