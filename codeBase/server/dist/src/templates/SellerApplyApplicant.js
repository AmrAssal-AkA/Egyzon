"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerApplyApplicantTemplate = void 0;
const sendEmail_1 = __importDefault(require("../config/sendEmail"));
;
const SellerApplyApplicantTemplate = async (to, applicantName, storeName) => {
    await (0, sendEmail_1.default)(to, "Seller Applicant", `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; text-align: center; padding: 20px;">
        <p>Dear ${applicantName},</p>
        <p>Thank you for applying to become a seller on our platform. We have received your application for the store "${storeName}".</p>
        <p>Our team will review your application and get back to you shortly.</p>
        <p>If you have any questions or need assistance, please contact our support team.</p>
        <p>Best regards,</p>
        <p>The Team</p>
        <p>Note: Please do not reply to this email. This is an automated message.</p>
        </div>`);
};
exports.SellerApplyApplicantTemplate = SellerApplyApplicantTemplate;
//# sourceMappingURL=SellerApplyApplicant.js.map