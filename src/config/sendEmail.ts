import {Resend} from "resend";
import dotenv from "dotenv";
dotenv.config();

import { AppError } from "../utils/AppError";


const resend = new Resend(process.env.RESEND_API_KEY);

const sendnoReplayEmail = async (to: string, subject: string, html: string) => {
    const {data, error} = await resend.emails.send({
        from: "no-replay@resend.dev",
        to,
        subject,
        html,
    });
    if(error) throw new AppError(500, "Failed to send email");

    return data;
}

export default sendnoReplayEmail;