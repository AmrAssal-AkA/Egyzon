"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerServices = void 0;
const sellerModel_1 = __importDefault(require("../models/sellerModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const AppError_1 = require("../utils/AppError");
const SellerApplyApplicant_1 = require("../templates/SellerApplyApplicant");
exports.SellerServices = {
    ApplyAsPartner: async (sellerData, userId) => {
        const user = await userModel_1.default.findById(userId);
        if (!user) {
            throw new AppError_1.AppError(404, "User not found");
        }
        const existingSeller = await sellerModel_1.default.findOne({ user: user._id });
        if (existingSeller) {
            throw new AppError_1.AppError(400, "User has already applied to be a seller");
        }
        console.log("Seller data:", sellerData);
        const SaveSellerData = await sellerModel_1.default.create({
            user: user._id,
            storeName: sellerData.storeName,
            commercialRegisterNumber: sellerData.commercialRegisterNumber,
            taxCardNumber: sellerData.taxCardNumber,
            sellerDocuments: {
                commercialRegisterUrl: sellerData.commercialRegisterUrl,
                taxCardUrl: sellerData.taxCardUrl,
            },
            applicantStatus: "pending",
        });
        try {
            await (0, SellerApplyApplicant_1.SellerApplyApplicantTemplate)(user.email, user.FirstName, sellerData.storeName);
        }
        catch (err) {
            console.error("Error sending email to applicant:", err);
        }
        return SaveSellerData;
    },
    checkExistingSeller: async (userId) => {
        const user = await userModel_1.default.findById(userId);
        if (!user)
            throw new AppError_1.AppError(404, "user not found");
        const existingSeller = await sellerModel_1.default.findOne({ user: user._id });
        if (existingSeller)
            throw new AppError_1.AppError(400, "User has already applied to be a seller");
        return existingSeller;
    },
    setupStore: async (storeData, userId) => {
        try {
            const seller = await sellerModel_1.default.findOne({ user: userId });
            if (!seller) {
                throw new AppError_1.AppError(404, "Seller not found");
            }
            if (seller.applicantStatus !== "approved") {
                throw new AppError_1.AppError(403, "Seller is not approved to set up a store");
            }
            const { storeLogo, storeBanner, storeDescription, storeType, storephysicalAddress, storeOnlineAddress, } = storeData;
            seller.storeManagement = {
                storeLogo,
                storeBanner,
                storeDescription,
                storeType,
                storephysicalAddress,
                storeOnlineAddress,
            };
            await seller.save();
            return seller;
        }
        catch (error) {
            console.log(error);
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    },
};
//# sourceMappingURL=seller.services.js.map