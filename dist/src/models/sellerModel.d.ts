import mongoose, { Schema } from "mongoose";
import { ISeller } from "../types/User.types";
declare const _default: mongoose.Model<ISeller, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, ISeller, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<ISeller, mongoose.Model<ISeller, any, any, any, any, any, ISeller>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ISeller, mongoose.Document<unknown, {}, ISeller, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    FirstName?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    LastName?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    email?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    password?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    role?: mongoose.SchemaDefinitionProperty<"admin" | "customer" | "seller", ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    phoneNumber?: mongoose.SchemaDefinitionProperty<string | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    isBlocked?: mongoose.SchemaDefinitionProperty<boolean, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    isVerified?: mongoose.SchemaDefinitionProperty<boolean | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    refreshToken?: mongoose.SchemaDefinitionProperty<string | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    emailVerificationToken?: mongoose.SchemaDefinitionProperty<string | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    emailVerificationTokenExpiration?: mongoose.SchemaDefinitionProperty<Date | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    sellerId?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    user?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    conercialRegisterNumber?: mongoose.SchemaDefinitionProperty<number, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    taxCardNumber?: mongoose.SchemaDefinitionProperty<number, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    sellerDocuments?: mongoose.SchemaDefinitionProperty<{
        commercialRegisterFile: string[];
        taxCardFile: string[];
    }, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    storeName?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    storeManagement?: mongoose.SchemaDefinitionProperty<{
        storeDescription: string;
        storeLogo: string;
        storeBanner: string;
        storeType: 'physical' | 'online' | 'both';
        storephysicalAddress?: string;
        storeOnlineAddress?: string;
    }, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    wallet?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    contary?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    applicantStatus?: mongoose.SchemaDefinitionProperty<"additional_docs_requested" | "approved" | "pending" | "rejected" | "under-review", ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, ISeller, mongoose.Document<unknown, {}, ISeller, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
}, ISeller>, ISeller>;
export default _default;
//# sourceMappingURL=sellerModel.d.ts.map