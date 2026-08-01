"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resend_1 = require("resend");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AppError_1 = require("../utils/AppError");
const resend = new resend_1.Resend(process.env.RESEND_API_KEY);
const sendEmail = async (to, subject, html) => {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to,
            subject,
            html,
        });
    }
    catch (error) {
        if (error instanceof AppError_1.AppError) {
            throw new AppError_1.AppError(error.statusCode, error.message);
        }
        else {
            throw new AppError_1.AppError(500, "Internal Server Error");
        }
    }
};
exports.default = sendEmail;
//# sourceMappingURL=sendEmail.js.map