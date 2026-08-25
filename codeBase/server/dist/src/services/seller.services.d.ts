import type { OrderStatus } from "../types/order.type";
export declare const SellerServices: {
    ApplyAsPartner: (sellerData: any, userId: string) => Promise<import("mongodb").WithId<import("bson").Document> | null>;
    checkExistingSeller: (userId: string) => Promise<null>;
    setupStore: (storeData: any, userId: string) => Promise<import("mongoose").Document<unknown, {}, import("../types/User.types").ISeller, {}, import("mongoose").DefaultSchemaOptions> & import("../types/User.types").ISeller & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getTotalProductsBySeller: (sellerId: string) => Promise<{
        totalProductCounts: number;
    }>;
    getTotalOrder: (sellerId: string) => Promise<{
        totalOrders: number;
    }>;
    getTotalRevenue: (sellerId: string) => Promise<{
        totalRevenue: number;
    }>;
    getTopProductsByRevenue: (sellerId: string) => Promise<{
        productId: string;
        name: string;
        image: string | null;
        sales: number;
        revenue: number;
    }[]>;
    getAllOrders: (sellerId: string) => Promise<(import("mongoose").Document<unknown, {}, import("../types/order.type").IOrder, {}, import("mongoose").DefaultSchemaOptions> & import("../types/order.type").IOrder & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    })[]>;
    totalInventoryValue: (sellerId: string) => Promise<{
        totalInventoryValue: number;
    }>;
    changeOrderStatus: (sellerId: string, orderId: string, newStatus: OrderStatus) => Promise<void>;
};
//# sourceMappingURL=seller.services.d.ts.map