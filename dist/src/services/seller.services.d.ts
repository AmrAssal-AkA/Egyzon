export declare const SellerServices: {
    ApplyAsPartner: (sellerData: any, userId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../types/User.types").ISeller, {}, import("mongoose").DefaultSchemaOptions> & import("../types/User.types").ISeller & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    checkExistingSeller: (userId: string) => Promise<null>;
    setupStore: (storeData: any, userId: string) => Promise<import("mongoose").Document<unknown, {}, import("../types/User.types").ISeller, {}, import("mongoose").DefaultSchemaOptions> & import("../types/User.types").ISeller & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
};
//# sourceMappingURL=seller.services.d.ts.map