"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const AppError_1 = require("../../utils/AppError");
const userModel_1 = __importDefault(require("../../models/userModel"));
const password_ustils_1 = require("../../utils/password.ustils");
const changePasswordTemp_1 = __importDefault(require("../../templates/changePasswordTemp"));
const Responses_1 = require("../../utils/Responses");
exports.CustomerController = {
    changePassword: async (req, res) => {
        try {
            const userId = req.user?.userId;
            const customer = await userModel_1.default.findById(userId);
            const { newPassword, confirmPassword } = req.body;
            if (!userId)
                return (0, Responses_1.sendErrorResponse)(res, 401, "Unauthorized");
            if (!newPassword || !confirmPassword)
                return (0, Responses_1.sendErrorResponse)(res, 400, "New password and confirm password are required");
            if (newPassword !== confirmPassword)
                return (0, Responses_1.sendErrorResponse)(res, 400, "Passwords do not match");
            if (!customer)
                return (0, Responses_1.sendErrorResponse)(res, 404, "Customer not found");
            const hashedPassword = await (0, password_ustils_1.hashPassword)(newPassword);
            customer.password = hashedPassword;
            await customer.save();
            await (0, changePasswordTemp_1.default)(customer.email, customer.FirstName);
            return (0, Responses_1.sendSuccessResponse)(res, 200, "Password changed successfully");
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                return (0, Responses_1.sendErrorResponse)(res, error.statusCode, error.message);
            }
            return (0, Responses_1.sendErrorResponse)(res, 500, "Internal Server Error");
        }
    },
};
//# sourceMappingURL=updateCustomer.Controller.js.map