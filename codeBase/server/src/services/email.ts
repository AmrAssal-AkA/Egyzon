import nodemailer, {Transporter} from "nodemailer";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";

interface sendEmailParams {
    to: string;
    subject: string;
    html: string;
}

let transporter: Transporter | null = null;

function getTransporter(): Transporter {
    if (transporter) return transporter;

    const user = process.env.GMAIL_EMAIL;
    const pass = process.env.GMAIL_PASSWORD;

    if (!user || !pass) {
        logger.error("GMAIL_EMAIL or GMAIL_PASSWORD is not set in environment variables");
        throw new AppError(500, "Email service is not configured properly");
    }

    transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user,
            pass,
        },
    });

    return transporter;
}

export const sendEmail = async ({ to, subject, html }: sendEmailParams): Promise<void> => {
    const transporter = getTransporter();
    try {
        await transporter.sendMail({
            from: `Egyzon <${process.env.GMAIL_EMAIL}>`,
            to,
            subject,
            html,
        });
    }catch(error){
        logger.error(`Failed to send email to ${to}: ${error}`);
        throw new AppError(500, "Failed to send email");
    }
}