import { sendEmail } from "../services/email";
import {
  renderEmailLayout,
  renderButton,
  renderInfoBox,
  renderUrlFallback,
} from "./emailLayout";

export const forgetPasswordTemplate = async (
  to: string,
  token: string,
  resetPasswordUrl: string,
) => {
  const fullResetUrl = `${resetPasswordUrl}?token=${token}`;

  const content = `
    <div style="text-align: left;">
      <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #0f172a; line-height: 1.3;">
        Password Reset Request
      </h1>

      <p style="margin: 0 0 16px 0; color: #475569; font-size: 15px; line-height: 1.6;">
        We received a request to reset the password for your Egyzon account. To proceed with setting up a new password, click the button below:
      </p>

      ${renderButton({
        text: "Reset Password",
        url: fullResetUrl,
        bgColor: "#2563eb",
      })}

      ${renderInfoBox({
        title: "Didn't request a password reset?",
        content:
          "If you did not request this change, you can safely disregard this email. Your password will remain unchanged and your account is secure.",
        bgColor: "#fffbeb",
        borderColor: "#fef3c7",
        titleColor: "#92400e",
      })}

      <p style="margin: 16px 0 0 0; font-size: 13px; color: #64748b; line-height: 1.5;">
        For your security, this password reset link will expire in 1 hour.
      </p>

      ${renderUrlFallback(fullResetUrl)}
    </div>
  `;

  return sendEmail({
    to,
    subject: "Reset Your Password - Egyzon",
    html: renderEmailLayout({
      title: "Reset Your Password - Egyzon",
      previewText: "Request to reset your Egyzon account password",
      badge: {
        text: "Security Alert",
        bgColor: "#eff6ff",
        textColor: "#1d4ed8",
      },
      content,
    }),
  });
};
