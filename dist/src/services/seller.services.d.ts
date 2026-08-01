export declare const SellerServices: {
    ApplyAsPartner: (sellerData: any, userId: string) => Promise<import("mongoose").Document<unknown, {}, import("../types/User.types").ISeller, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<import("../types/User.types").ISeller & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    setupStore: (storeData: any, userId: string) => Promise<import("mongoose").Document<unknown, {}, import("../types/User.types").ISeller, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<import("../types/User.types").ISeller & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
};
//# sourceMappingURL=seller.services.d.ts.map