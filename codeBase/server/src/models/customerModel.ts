import mongoose, { Schema } from 'mongoose';
import {ICustomer} from "../types/User.types";
import User from "./userModel";

const CustomerSchema = new Schema<ICustomer>({

    orders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Order",
        default: [],
    },
    wishlist: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Wishlist",
        default: [],
    },
    paymentMethods: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "PaymentMethod",
        default: [],
    },
    address: {
        type: [String],
        default: []
    },
});



export default User.discriminator<ICustomer>("customer", CustomerSchema, "customer");

