import { sendEmail } from "../services/email";
import {
  renderEmailLayout,
  renderButton,
  renderInfoBox,
  renderUrlFallback,
} from "./emailLayout";

const verifyEmailTemplate = async (
  to: string,
  verificationUrl: string,
) => {

  const content = `
    <div style="text-align: left;">
      <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #0f172a; line-height: 1.3;">
        Welcome to Egyzon!
      </h1>
      
      <p style="margin: 0 0 16px 0; color: #475569; font-size: 15px; line-height: 1.6;">
        Thank you for joining Egyzon. We're excited to have you on board! To finish setting up your account and get full access to the marketplace, please confirm your email address:
      </p>

      ${renderButton({
        text: "Verify Email Address",
        url: verificationUrl,
        bgColor: "#2563eb",
      })}

      ${renderInfoBox({
        title: "Security Notice",
        content:
          "This verification link is valid for 24 hours. If you did not create an account on Egyzon, you can safely ignore this email &mdash; no account will be activated without verification.",
        bgColor: "#f8fafc",
        borderColor: "#e2e8f0",
      })}

      ${renderUrlFallback(verificationUrl)}
    </div>
  `;

  await sendEmail({
    to,
    subject: "Verify Your Email Address - Egyzon",
    html: renderEmailLayout({
      title: "Verify Your Email Address - Egyzon",
      previewText: "Verify your email to activate your Egyzon account",
      badge: {
        text: "Account Verification",
        bgColor: "#eff6ff",
        textColor: "#1d4ed8",
      },
      content,
    }),
  });
};

export default verifyEmailTemplate;
