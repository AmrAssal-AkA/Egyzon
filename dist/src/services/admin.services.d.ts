import { IAdmin, ISeller, IUser } from "../types/User.types";
export declare const AdminService: {
    AdminLoggingin: (email: string, password: string) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: import("mongoose").Document<unknown, {}, IAdmin, {}, import("mongoose").DefaultSchemaOptions> & IAdmin & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        };
    }>;
    getAllUser: () => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    promoteToAdmin: (userId: string) => Promise<import("mongoose").Document<unknown, {}, IAdmin, {}, import("mongoose").DefaultSchemaOptions> & IAdmin & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    blockUser: (userId: string) => Promise<IUser>;
    activateUser: (userId: string) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllSellers: (page: number, limit: number) => Promise<{
        sellers: (import("mongoose").Document<unknown, {}, ISeller, {}, import("mongoose").DefaultSchemaOptions> & ISeller & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getAllPendingSellerApplications: () => Promise<(import("mongoose").Document<unknown, {}, ISeller, {}, import("mongoose").DefaultSchemaOptions> & ISeller & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    approveSeller: (userId: string) => Promise<ISeller>;
    rejectSeller: (userId: string) => Promise<ISeller>;
    requestAdditionalDocuments: (userId: string, message: string) => Promise<ISeller>;
};
//# sourceMappingURL=admin.services.d.ts.map