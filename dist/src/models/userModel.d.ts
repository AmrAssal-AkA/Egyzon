import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/User.types";
declare const _default: mongoose.Model<IUser, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, IUser, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<IUser, mongoose.Model<IUser, any, any, any, any, any, IUser>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IUser, mongoose.Document<unknown, {}, IUser, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    FirstName?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    LastName?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    email?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    password?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    role?: mongoose.SchemaDefinitionProperty<"admin" | "customer" | "seller", IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    phoneNumber?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    isBlocked?: mongoose.SchemaDefinitionProperty<boolean, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    isVerified?: mongoose.SchemaDefinitionProperty<boolean | undefined, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    refreshToken?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    emailVerificationToken?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    emailVerificationTokenExpiration?: mongoose.SchemaDefinitionProperty<Date | undefined, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, IUser, mongoose.Document<unknown, {}, IUser, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
}, IUser>, IUser>;
export default _default;
//# sourceMappingURL=userModel.d.ts.map