import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    customerId: string;
    user: mongoose.Types.ObjectId;
    orders: any[];
    wishlist: any[];
    cart: any[];
    paymentMethods: any[];
    createdAt: NativeDate;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    customerId: string;
    user: mongoose.Types.ObjectId;
    orders: any[];
    wishlist: any[];
    cart: any[];
    paymentMethods: any[];
    createdAt: NativeDate;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    customerId: string;
    user: mongoose.Types.ObjectId;
    orders: any[];
    wishlist: any[];
    cart: any[];
    paymentMethods: any[];
    createdAt: NativeDate;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    customerId: string;
    user: mongoose.Types.ObjectId;
    orders: any[];
    wishlist: any[];
    cart: any[];
    paymentMethods: any[];
    createdAt: NativeDate;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    customerId: string;
    user: mongoose.Types.ObjectId;
    orders: any[];
    wishlist: any[];
    cart: any[];
    paymentMethods: any[];
    createdAt: NativeDate;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    customerId: string;
    user: mongoose.Types.ObjectId;
    orders: any[];
    wishlist: any[];
    cart: any[];
    paymentMethods: any[];
    createdAt: NativeDate;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    updatedAt: NativeDate;
    customerId: string;
    user: mongoose.Types.ObjectId;
    orders: any[];
    wishlist: any[];
    cart: any[];
    paymentMethods: any[];
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    updatedAt: NativeDate;
    customerId: string;
    user: mongoose.Types.ObjectId;
    orders: any[];
    wishlist: any[];
    cart: any[];
    paymentMethods: any[];
    createdAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=customerModel.d.ts.map