import { sendEmail } from "../services/email";
import { renderEmailLayout, renderButton, renderInfoBox } from "./emailLayout";

export const SellerApplyApplicantTemplate = async (
  to: string,
  applicantName: string,
  storeName: string,
) => {
  const frontendUrl = process.env.FRONTEND_URL || "https://egyzon.com";
  const name = applicantName ? applicantName.trim() : "Partner";

  const content = `
    <div style="text-align: left;">
      <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #0f172a; line-height: 1.3;">
        Seller Application Received
      </h1>

      <p style="margin: 0 0 16px 0; color: #475569; font-size: 15px; line-height: 1.6;">
        Dear ${name},
      </p>

      <p style="margin: 0 0 20px 0; color: #475569; font-size: 15px; line-height: 1.6;">
        Thank you for your interest in selling on Egyzon! We have received your merchant application for <strong style="color: #0f172a;">${storeName}</strong>.
      </p>

      <!-- Application Details Card -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin: 20px 0;">
        <tr>
          <td style="padding: 16px 20px; border-bottom: 1px solid #e2e8f0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="font-size: 13px; color: #64748b; font-weight: 500;">Store Name:</td>
                <td align="right" style="font-size: 14px; color: #0f172a; font-weight: 700;">${storeName}</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 16px 20px; border-bottom: 1px solid #e2e8f0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="font-size: 13px; color: #64748b; font-weight: 500;">Application Status:</td>
                <td align="right">
                  <span style="display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; background-color: #fef3c7; color: #92400e;">
                    Under Review
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 16px 20px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="font-size: 13px; color: #64748b; font-weight: 500;">Estimated Review Time:</td>
                <td align="right" style="font-size: 13px; color: #0f172a; font-weight: 600;">1 &ndash; 2 Business Days</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      ${renderInfoBox({
        title: "What happens next?",
        content:
          "Our merchant verification team is reviewing your submitted details and business documents. You will receive an email update as soon as your store is verified and ready to sell.",
        bgColor: "#eff6ff",
        borderColor: "#dbeafe",
        titleColor: "#1e40af",
      })}

      <p style="margin: 20px 0 0 0; font-size: 14px; color: #64748b; line-height: 1.6;">
        If you have any questions or need to update your application details, please feel free to reach out to our <a href="${frontendUrl}/contact" style="color: #2563eb; text-decoration: underline;">Merchant Support Team</a>.
      </p>
    </div>
  `;

  await sendEmail({
    to,
    subject: `Application Received for ${storeName} - Egyzon`,
    html: renderEmailLayout({
      title: "Seller Application Received - Egyzon",
      previewText: `We received your seller application for ${storeName}`,
      badge: {
        text: "Merchant Onboarding",
        bgColor: "#fef3c7",
        textColor: "#92400e",
      },
      content,
    }),
  });
};

export const SellerApplyApplovalTemplate = async (
  to: string,
  applicantName: string,
  storeName: string,
) => {
  const frontendUrl = process.env.FRONTEND_URL || "https://egyzon.com";
  const sellerDashboardUrl = `${frontendUrl}/seller`;
  const name = applicantName ? applicantName.trim() : "Partner";

  const content = `
    <div style="text-align: left;">
      <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #0f172a; line-height: 1.3;">
        Congratulations, ${name}! 🎉
      </h1>

      <p style="margin: 0 0 16px 0; color: #475569; font-size: 15px; line-height: 1.6;">
        We are thrilled to let you know that your application to sell on Egyzon with your store <strong style="color: #0f172a;">${storeName}</strong> has been <strong>approved</strong>!
      </p>

      <!-- Store Status Card -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; margin: 20px 0;">
        <tr>
          <td style="padding: 16px 20px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td>
                  <div style="font-size: 12px; color: #15803d; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Store Name</div>
                  <div style="font-size: 16px; color: #14532d; font-weight: 700; margin-top: 2px;">${storeName}</div>
                </td>
                <td align="right">
                  <span style="display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; background-color: #16a34a; color: #ffffff;">
                    Approved &amp; Active
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <h3 style="margin: 24px 0 12px 0; font-size: 16px; font-weight: 600; color: #0f172a;">
        Next Steps to Start Selling:
      </h3>

      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
        <tr>
          <td width="28" valign="top" style="padding-bottom: 12px;">
            <span style="display: inline-block; width: 22px; height: 22px; line-height: 22px; text-align: center; border-radius: 50%; background-color: #dbeafe; color: #1d4ed8; font-size: 12px; font-weight: 700;">1</span>
          </td>
          <td style="font-size: 14px; color: #475569; line-height: 1.5; padding-bottom: 12px; padding-left: 8px;">
            <strong style="color: #0f172a;">Log in to Seller Hub:</strong> Access your merchant dashboard using your registered credentials.
          </td>
        </tr>
        <tr>
          <td width="28" valign="top" style="padding-bottom: 12px;">
            <span style="display: inline-block; width: 22px; height: 22px; line-height: 22px; text-align: center; border-radius: 50%; background-color: #dbeafe; color: #1d4ed8; font-size: 12px; font-weight: 700;">2</span>
          </td>
          <td style="font-size: 14px; color: #475569; line-height: 1.5; padding-bottom: 12px; padding-left: 8px;">
            <strong style="color: #0f172a;">List Your Products:</strong> Upload your catalog with images, descriptions, pricing, and stock.
          </td>
        </tr>
        <tr>
          <td width="28" valign="top">
            <span style="display: inline-block; width: 22px; height: 22px; line-height: 22px; text-align: center; border-radius: 50%; background-color: #dbeafe; color: #1d4ed8; font-size: 12px; font-weight: 700;">3</span>
          </td>
          <td style="font-size: 14px; color: #475569; line-height: 1.5; padding-left: 8px;">
            <strong style="color: #0f172a;">Fulfill Orders &amp; Grow:</strong> Benefit from nationwide logistics, escrow payouts, and seller analytics.
          </td>
        </tr>
      </table>

      ${renderButton({
        text: "Launch Seller Dashboard",
        url: sellerDashboardUrl,
        bgColor: "#2563eb",
      })}

      <p style="margin: 20px 0 0 0; font-size: 13px; color: #64748b; line-height: 1.5;">
        Need help onboarding? Our merchant support specialists are available at <a href="${frontendUrl}/contact" style="color: #2563eb; text-decoration: underline;">Merchant Support</a>.
      </p>
    </div>
  `;

  await sendEmail({
    to,
    subject: `Congratulations! ${storeName} is Approved on Egyzon`,
    html: renderEmailLayout({
      title: "Seller Application Approved - Egyzon",
      previewText: `Your seller application for ${storeName} has been approved!`,
      badge: {
        text: "Application Approved",
        bgColor: "#f0fdf4",
        textColor: "#166534",
      },
      content,
    }),
  });
};
