import nodemailer, { Transporter } from "nodemailer";
import { AppError } from "../utils/AppError";
import logger from "../utils/logger";
import { renderTemplate, EmailTemplateName } from "../templates";

export interface SendEmailParams {
  to: string;
  subject?: string | undefined;
  html?: string | undefined;
  template?: EmailTemplateName | string | undefined;
  context?: Record<string, any> | undefined;
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
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  return transporter;
}

export const sendEmail = async ({
  to,
  subject,
  html,
  template,
  context,
}: SendEmailParams): Promise<void> => {
  let emailHtml = html || "";
  let emailSubject = subject || "";

  if (template) {
    const rendered = renderTemplate(template, context);
    emailHtml = rendered.html;
    if (!emailSubject) {
      emailSubject = rendered.subject;
    }
  }

  if (!to) {
    throw new AppError(400, "Recipient email address ('to') is required");
  }
  if (!emailSubject) {
    throw new AppError(400, "Email subject is required");
  }
  if (!emailHtml) {
    throw new AppError(400, "Email body (html or template) is required");
  }

  const transporter = getTransporter();
  try {
    await transporter.sendMail({
      from: `Egyzon <${process.env.GMAIL_EMAIL}>`,
      to,
      subject: emailSubject,
      html: emailHtml,
    });
  } catch (error) {
    logger.error(`Failed to send email to ${to}: ${error}`);
    throw new AppError(500, "Failed to send email");
  }
};
