"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customerModel_1 = __importDefault(require("../../models/customerModel"));
const Responses_1 = require("../../utils/Responses");
const AppError_1 = require("../../utils/AppError");
const onBoarding = async (req, res) => {
    try {
        const userId = req.user?.userId || (process.env.NODE_ENV !== "production" && req.body?.userId);
        const { phoneNumber, address } = req.body;
        console.log("Onboarding request received for user:", userId, { phoneNumber, address });
        if (!userId)
            return (0, Responses_1.sendErrorResponse)(res, 401, "Unauthorized", "Missing user id");
        const customer = await customerModel_1.default.findById(userId);
        if (!customer)
            return (0, Responses_1.sendErrorResponse)(res, 404, "User not found", "User not found");
        if (customer.completedOnboarding)
            return (0, Responses_1.sendErrorResponse)(res, 400, "User is already onboarded", "User is already onboarded");
        customer.phoneNumber = phoneNumber;
        customer.address = Array.isArray(address) ? address : [address];
        customer.completedOnboarding = true;
        await customer.save();
        console.log("Onboarding completed for user:", customer._id);
        return (0, Responses_1.sendSuccessResponse)(res, 200, "Onboarding completed successfully", {
            customerId: customer._id,
            phoneNumber: customer.phoneNumber,
            address: customer.address,
        });
    }
    catch (error) {
        console.error("Onboarding failed:", error);
        if (error?.code === 11000) {
            return (0, Responses_1.sendErrorResponse)(res, 409, "Phone number is already in use", error);
        }
        if (error instanceof AppError_1.AppError) {
            return (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.message);
        }
        else {
            return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error", error);
        }
    }
};
exports.default = onBoarding;
//# sourceMappingURL=onBoarding.js.map