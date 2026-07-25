import {Resend} from "resend";
import dotenv from "dotenv";
dotenv.config();

import { AppError } from "../utils/AppError";


const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to,
            subject,
            html,
        });
    }catch (error) {
        if (error instanceof AppError) {
            throw new AppError(error.statusCode, error.message);
        } else {
            throw new AppError(500, "Internal Server Error");
        }
    }
}

export default sendEmail;