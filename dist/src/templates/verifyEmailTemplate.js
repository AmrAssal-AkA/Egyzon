"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendEmail_1 = __importDefault(require("../config/sendEmail"));
const verifyEmailTemplate = async (to, token, verificationUrl) => {
    return await (0, sendEmail_1.default)(to, "Verify your email", `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; text-align: center; padding: 20px;">
        <p>Thank you for registering. Please verify your email by clicking the link below:</p>
        <a style="background-color:black; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 4px;" href="${verificationUrl}">Verify Email</a>
        <p>If you did not register, please ignore this email.</p>
        <p>Best regards,</p>
        <p>The Team</p>
        <p>Note: Please do not reply to this email. This is an automated message.</p>
        <p>If you have any questions or need assistance, please contact our support team.</p>
        <p>This link will expire in 1 hour.</p>
        </div>`);
};
exports.default = verifyEmailTemplate;
//# sourceMappingURL=verifyEmailTemplate.js.map