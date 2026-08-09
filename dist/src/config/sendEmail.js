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
const sendnoReplayEmail = async (to, subject, html) => {
    const { data, error } = await resend.emails.send({
        from: "no-replay@resend.dev",
        to,
        subject,
        html,
    });
    if (error)
        throw new AppError_1.AppError(500, "Failed to send email");
    return data;
};
exports.default = sendnoReplayEmail;
//# sourceMappingURL=sendEmail.js.map