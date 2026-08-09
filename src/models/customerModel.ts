import mongoose, { Schema } from 'mongoose';
import {ICustomer} from "../types/User.types";


const CustomerSchema = new Schema<ICustomer>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
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
}, { timestamps: true });

export default mongoose.model("Customer", CustomerSchema);
