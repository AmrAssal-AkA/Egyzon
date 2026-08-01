import mongoose, { Schema } from 'mongoose';
import { ICustomer } from "../types/User.types";
declare const _default: mongoose.Model<ICustomer, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, ICustomer, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<ICustomer, mongoose.Model<ICustomer, any, any, any, any, any, ICustomer>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ICustomer, mongoose.Document<unknown, {}, ICustomer, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    FirstName?: mongoose.SchemaDefinitionProperty<string, ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    LastName?: mongoose.SchemaDefinitionProperty<string, ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    email?: mongoose.SchemaDefinitionProperty<string, ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    password?: mongoose.SchemaDefinitionProperty<string, ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    role?: mongoose.SchemaDefinitionProperty<"admin" | "customer" | "seller", ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    phoneNumber?: mongoose.SchemaDefinitionProperty<string | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    isBlocked?: mongoose.SchemaDefinitionProperty<boolean, ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    isVerified?: mongoose.SchemaDefinitionProperty<boolean | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    refreshToken?: mongoose.SchemaDefinitionProperty<string | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    emailVerificationToken?: mongoose.SchemaDefinitionProperty<string | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    emailVerificationTokenExpiration?: mongoose.SchemaDefinitionProperty<Date | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    customerId?: mongoose.SchemaDefinitionProperty<string, ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    user?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    orders?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId[], ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    wishlist?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId[], ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    cart?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId[], ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    paymentMethods?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId[], ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    address?: mongoose.SchemaDefinitionProperty<string[] | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, ICustomer, mongoose.Document<unknown, {}, ICustomer, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
}, ICustomer>, ICustomer>;
export default _default;
//# sourceMappingURL=customerModel.d.ts.map