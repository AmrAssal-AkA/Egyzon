"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../models/userModel"));
const customerModel_1 = __importDefault(require("../../models/customerModel"));
const Responses_1 = require("../../utils/Responses");
const AppError_1 = require("../../utils/AppError");
const onBoarding = async (req, res) => {
    try {
        const userId = req.user?.userId || (process.env.NODE_ENV !== "production" && req.body.userId);
        const { phoneNumber, address } = req.body;
        const existingUser = await userModel_1.default.findById(userId);
        if (!existingUser) {
            return (0, Responses_1.sendErrorResponse)(res, 404, "User not found", "User not found");
        }
        const customer = await customerModel_1.default.findOne({ user: userId });
        if (!customer || existingUser.role !== "customer") {
            return (0, Responses_1.sendErrorResponse)(res, 400, "Bad Request", "User is not a customer");
        }
        existingUser.phoneNumber = phoneNumber;
        customer.address = address;
        await customer.save();
        await existingUser.save();
        (0, Responses_1.sendSuccessResponse)(res, 200, "Onboarding completed successfully", {
            customerId: customer.customerId,
            phoneNumber: customer.phoneNumber,
            address: customer.address,
        });
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.message);
        }
        else {
            (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", error);
        }
    }
};
exports.default = onBoarding;
//# sourceMappingURL=onBoarding.js.map