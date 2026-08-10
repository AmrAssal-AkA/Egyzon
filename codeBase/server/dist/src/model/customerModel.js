"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const CustomerSchema = new mongoose_1.default.Schema({
    customerId: {
        type: String,
        required: true,
        unique: true,
        default: uuid_1.v4,
        index: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orders: {
        type: Array,
        default: [],
    },
    wishlist: {
        type: Array,
        default: [],
    },
    cart: {
        type: Array,
        default: [],
    },
    paymentMethods: {
        type: Array,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Customer", CustomerSchema);
//# sourceMappingURL=customerModel.js.map