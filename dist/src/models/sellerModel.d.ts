import mongoose, { Schema } from "mongoose";
import { ISeller } from "../types/User.types";
declare const _default: mongoose.Model<ISeller, {}, {}, {}, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, Schema<ISeller, mongoose.Model<ISeller, any, any, any, any, any, ISeller>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, {
    id?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    FirstName?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    LastName?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    email?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    password?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    role?: mongoose.SchemaDefinitionProperty<"admin" | "customer" | "seller", ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    phoneNumber?: mongoose.SchemaDefinitionProperty<string | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    isBlocked?: mongoose.SchemaDefinitionProperty<boolean, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    isVerified?: mongoose.SchemaDefinitionProperty<boolean | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    refreshToken?: mongoose.SchemaDefinitionProperty<string | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    googleId?: mongoose.SchemaDefinitionProperty<string | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    facebookId?: mongoose.SchemaDefinitionProperty<string | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    resetPasswordToken?: mongoose.SchemaDefinitionProperty<string | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    resetPasswordTokenExpiration?: mongoose.SchemaDefinitionProperty<Date | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    emailVerificationToken?: mongoose.SchemaDefinitionProperty<string | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    emailVerificationTokenExpiration?: mongoose.SchemaDefinitionProperty<Date | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    completedOnboarding?: mongoose.SchemaDefinitionProperty<boolean | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    forgetPasswordToken?: mongoose.SchemaDefinitionProperty<string | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    forgetPasswordTokenExpiration?: mongoose.SchemaDefinitionProperty<Date | undefined, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    sellerId?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    user?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    commercialRegisterNumber?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    taxCardNumber?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    sellerDocuments?: mongoose.SchemaDefinitionProperty<{
        commercialRegisterFile: string[];
        taxCardFile: string[];
    }, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    storeName?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    storeManagement?: mongoose.SchemaDefinitionProperty<{
        storeDescription: string;
        storeLogo: string;
        storeBanner: string;
        storeType: 'physical' | 'online' | 'both';
        storephysicalAddress?: string;
        storeOnlineAddress?: string;
    }, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    wallet?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    contary?: mongoose.SchemaDefinitionProperty<string, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    applicantStatus?: mongoose.SchemaDefinitionProperty<"additional_docs_requested" | "approved" | "pending" | "rejected" | "under-review", ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, ISeller, mongoose.Document<unknown, {}, ISeller, {}, mongoose.DefaultSchemaOptions> & ISeller & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
}, ISeller>, ISeller>;
export default _default;
//# sourceMappingURL=sellerModel.d.ts.map