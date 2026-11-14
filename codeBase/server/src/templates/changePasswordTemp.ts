import {
  renderEmailLayout,
  renderButton,
  renderInfoBox,
  renderUrlFallback,
} from "./emailLayout";

export interface ChangePasswordContext {
  name?: string | undefined;
  token?: string | undefined;
  resetPasswordUrl?: string | undefined;
}

export const renderChangePasswordTemplate = ({
  name,
  token,
  resetPasswordUrl,
}: ChangePasswordContext): { subject: string; html: string } => {
  const frontendUrl = process.env.FRONTEND_URL || "https://egyzon.com";
  const displayName = name ? name.trim() : "there";

  if (token) {
    // Case 1: Password reset / change request with token
    const resetUrl = resetPasswordUrl || `${frontendUrl}/reset-password/${token}`;
    const content = `
      <div style="text-align: left;">
        <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #0f172a; line-height: 1.3;">
          Hello ${displayName},
        </h1>

        <p style="margin: 0 0 16px 0; color: #475569; font-size: 15px; line-height: 1.6;">
          We received a request to update the password for your Egyzon account. If you initiated this request, please click the button below to set a new password:
        </p>

        ${renderButton({
          text: "Reset Password",
          url: resetUrl,
          bgColor: "#2563eb",
        })}

        ${renderInfoBox({
          title: "Important Security Notice",
          content:
            "If you did not request a password change, please ignore this email. Your existing password remains secure.",
          bgColor: "#fffbeb",
          borderColor: "#fef3c7",
          titleColor: "#92400e",
        })}

        ${renderUrlFallback(resetUrl)}
      </div>
    `;

    return {
      subject: "Password Change Request - Egyzon",
      html: renderEmailLayout({
        title: "Password Change Request - Egyzon",
        previewText: "Request to change your Egyzon account password",
        badge: {
          text: "Security Alert",
          bgColor: "#eff6ff",
          textColor: "#1d4ed8",
        },
        content,
      }),
    };
  } else {
    // Case 2: Confirmation that password was successfully updated
    const loginUrl = `${frontendUrl}/login`;
    const content = `
      <div style="text-align: left;">
        <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #0f172a; line-height: 1.3;">
          Hello ${displayName},
        </h1>

        <p style="margin: 0 0 16px 0; color: #475569; font-size: 15px; line-height: 1.6;">
          This email confirms that the password for your Egyzon account was changed successfully.
        </p>

        ${renderInfoBox({
          title: "Did you make this change?",
          content:
            "If you did not make this change, someone else may have gained access to your account. Please contact our support team immediately.",
          bgColor: "#fef2f2",
          borderColor: "#fee2e2",
          titleColor: "#991b1b",
        })}

        <div style="margin: 24px 0 16px 0;">
          <p style="margin: 0 0 12px 0; color: #475569; font-size: 14px;">
            You can sign in to your account with your new password here:
          </p>
          ${renderButton({
            text: "Sign In to Egyzon",
            url: loginUrl,
            bgColor: "#2563eb",
          })}
        </div>

        <p style="margin: 20px 0 0 0; font-size: 13px; color: #64748b; line-height: 1.5;">
          If you need assistance, visit our <a href="${frontendUrl}/contact" style="color: #2563eb; text-decoration: underline;">Support Center</a>.
        </p>
      </div>
    `;

    return {
      subject: "Your Egyzon Password Has Been Changed",
      html: renderEmailLayout({
        title: "Password Changed - Egyzon",
        previewText: "Your Egyzon account password was updated successfully",
        badge: {
          text: "Security Confirmation",
          bgColor: "#f0fdf4",
          textColor: "#166534",
        },
        content,
      }),
    };
  }
};

export default renderChangePasswordTemplate;
