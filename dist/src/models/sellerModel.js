"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userModel_1 = __importDefault(require("./userModel"));
const SellerSchema = new mongoose_1.Schema({
    commercialRegisterNumber: {
        type: String,
        required: true,
        unique: true,
    },
    taxCardNumber: {
        type: String,
        required: true,
        unique: true,
    },
    storeName: {
        type: String,
        unique: true,
    },
    sellerDocuments: {
        commercialRegisterUrl: {
            type: String,
            default: "",
        },
        taxCardUrl: {
            type: String,
            default: "",
        },
    },
    applicantStatus: {
        type: String,
        enum: [
            "pending",
            "under-review",
            "additional_docs_requested",
            "approved",
            "rejected",
        ],
        default: "pending",
    },
    storeManagement: {
        storeLogo: { type: String },
        storeBanner: { type: String },
        storeDescription: { type: String, default: "No description provided" },
        storeType: {
            type: String,
            enum: ["physical", "online", "both"],
            default: "physical",
        },
        storephysicalAddress: { type: String },
        storeOnlineAddress: { type: String },
    },
    wallet: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Wallet",
        default: null,
    },
    notes: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
    }
}, { timestamps: true });
exports.default = userModel_1.default.discriminator("seller", SellerSchema);
//# sourceMappingURL=sellerModel.js.map