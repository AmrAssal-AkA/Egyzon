import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/User.types";
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, Schema<IUser, mongoose.Model<IUser, any, any, any, any, any, IUser>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, {
    id?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    FirstName?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    LastName?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    email?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    password?: mongoose.SchemaDefinitionProperty<string, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    role?: mongoose.SchemaDefinitionProperty<"admin" | "customer" | "seller", IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    phoneNumber?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    isBlocked?: mongoose.SchemaDefinitionProperty<boolean, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    isVerified?: mongoose.SchemaDefinitionProperty<boolean | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    refreshToken?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    googleId?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    facebookId?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    resetPasswordToken?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    resetPasswordTokenExpiration?: mongoose.SchemaDefinitionProperty<Date | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    emailVerificationToken?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    emailVerificationTokenExpiration?: mongoose.SchemaDefinitionProperty<Date | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    completedOnboarding?: mongoose.SchemaDefinitionProperty<boolean | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    forgetPasswordToken?: mongoose.SchemaDefinitionProperty<string | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    forgetPasswordTokenExpiration?: mongoose.SchemaDefinitionProperty<Date | undefined, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, IUser, mongoose.Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
}, IUser>, IUser>;
export default _default;
//# sourceMappingURL=userModel.d.ts.map