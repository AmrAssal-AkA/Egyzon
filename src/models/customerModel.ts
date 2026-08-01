import mongoose, { Schema } from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import {ICustomer} from "../types/User.types";


const CustomerSchema = new Schema<ICustomer>({
    customerId:{
        type: String,
        required: true,
        unique: true,
        default: () => uuidv4(),
        index: true,
    },
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
        ref: "Product",
        default: [],
    },
    cart: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product",
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