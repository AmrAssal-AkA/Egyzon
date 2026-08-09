import mongoose, { Schema } from 'mongoose';
import { ICustomer } from "../types/User.types";
declare const _default: mongoose.Model<ICustomer, {}, {}, {}, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, Schema<ICustomer, mongoose.Model<ICustomer, any, any, any, any, any, ICustomer>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, {
    id?: mongoose.SchemaDefinitionProperty<string, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    FirstName?: mongoose.SchemaDefinitionProperty<string, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    LastName?: mongoose.SchemaDefinitionProperty<string, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    email?: mongoose.SchemaDefinitionProperty<string, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    password?: mongoose.SchemaDefinitionProperty<string, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    role?: mongoose.SchemaDefinitionProperty<"admin" | "customer" | "seller", ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    phoneNumber?: mongoose.SchemaDefinitionProperty<string | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    isBlocked?: mongoose.SchemaDefinitionProperty<boolean, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    isVerified?: mongoose.SchemaDefinitionProperty<boolean | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    refreshToken?: mongoose.SchemaDefinitionProperty<string | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    googleId?: mongoose.SchemaDefinitionProperty<string | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    facebookId?: mongoose.SchemaDefinitionProperty<string | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    resetPasswordToken?: mongoose.SchemaDefinitionProperty<string | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    resetPasswordTokenExpiration?: mongoose.SchemaDefinitionProperty<Date | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    emailVerificationToken?: mongoose.SchemaDefinitionProperty<string | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    emailVerificationTokenExpiration?: mongoose.SchemaDefinitionProperty<Date | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    completedOnboarding?: mongoose.SchemaDefinitionProperty<boolean | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    forgetPasswordToken?: mongoose.SchemaDefinitionProperty<string | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    forgetPasswordTokenExpiration?: mongoose.SchemaDefinitionProperty<Date | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    user?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    orders?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId[], ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    wishlist?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId[], ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    cart?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId[], ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    paymentMethods?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId[], ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    address?: mongoose.SchemaDefinitionProperty<string[] | undefined, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, ICustomer, mongoose.Document<unknown, {}, ICustomer, {}, mongoose.DefaultSchemaOptions> & ICustomer & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
}, ICustomer>, ICustomer>;
export default _default;
//# sourceMappingURL=customerModel.d.ts.map