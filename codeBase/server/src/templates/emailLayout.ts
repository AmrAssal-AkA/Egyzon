export interface EmailLayoutOptions {
  title: string;
  previewText?: string;
  badge?: {
    text: string;
    bgColor?: string;
    textColor?: string;
  };
  content: string;
}

export const renderButton = ({
  text,
  url,
  bgColor = "#2563eb",
  textColor = "#ffffff",
  align = "center",
}: {
  text: string;
  url: string;
  bgColor?: string;
  textColor?: string;
  align?: "left" | "center" | "right";
}): string => {
  return `
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 28px 0;">
      <tr>
        <td align="${align}">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="border-radius: 8px; background-color: ${bgColor};">
                <a href="${url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 14px 32px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-size: 15px; font-weight: 600; line-height: 1.2; color: ${textColor}; text-decoration: none; border-radius: 8px; text-align: center; mso-padding-alt: 0;">
                  <!--[if mso]><i style="letter-spacing: 25px; mso-font-width: -100%; mso-text-raise: 30pt">&nbsp;</i><![endif]-->
                  <span style="mso-text-raise: 15pt;">${text}</span>
                  <!--[if mso]><i style="letter-spacing: 25px; mso-font-width: -100%">&nbsp;</i><![endif]-->
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
};

export const renderInfoBox = ({
  title,
  content,
  bgColor = "#f8fafc",
  borderColor = "#e2e8f0",
  titleColor = "#0f172a",
}: {
  title?: string;
  content: string;
  bgColor?: string;
  borderColor?: string;
  titleColor?: string;
}): string => {
  return `
    <div style="background-color: ${bgColor}; border: 1px solid ${borderColor}; border-radius: 8px; padding: 16px 20px; margin: 20px 0;">
      ${title ? `<div style="font-size: 14px; font-weight: 600; color: ${titleColor}; margin-bottom: 6px;">${title}</div>` : ""}
      <div style="font-size: 13px; color: #475569; line-height: 1.6;">${content}</div>
    </div>
  `;
};

export const renderUrlFallback = (url: string): string => {
  return `
    <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #64748b; line-height: 1.6; word-break: break-all;">
      <p style="margin: 0 0 6px 0;">If the button above doesn't work, copy and paste this link into your browser:</p>
      <a href="${url}" style="color: #2563eb; text-decoration: underline;">${url}</a>
    </div>
  `;
};

export const renderEmailLayout = ({
  title,
  previewText,
  badge,
  content,
}: EmailLayoutOptions): string => {
  const currentYear = new Date().getFullYear();
  const frontendUrl = process.env.FRONTEND_URL || "https://egyzon.com";

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
  <title>${title}</title>
  <!--[if mso]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <style>
    /* Reset styles */
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
    }
    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: #334155;
      -webkit-font-smoothing: antialiased;
    }
    @media only screen and (max-width: 620px) {
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 0 !important;
      }
      .content-padding {
        padding: 24px 18px !important;
      }
      .mobile-center {
        text-align: center !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  ${
    previewText
      ? `<div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all;">
          ${previewText}
          ${"&nbsp;&zwnj;".repeat(30)}
        </div>`
      : ""
  }

  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" class="email-container" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);">
          
          <!-- Top Brand Accent Bar -->
          <tr>
            <td style="height: 4px; background: #2563eb;"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td align="center" style="padding: 28px 32px 20px 32px; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="${frontendUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                      <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 28px; font-weight: 800; letter-spacing: -0.5px; color: #0f172a;">
                        Egy<span style="color: #2563eb;">Zon</span>
                      </span>
                    </a>
                  </td>
                </tr>
                ${
                  badge
                    ? `<tr>
                        <td align="center" style="padding-top: 12px;">
                          <span style="display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; background-color: ${badge.bgColor || "#eff6ff"}; color: ${badge.textColor || "#1d4ed8"};">
                            ${badge.text}
                          </span>
                        </td>
                      </tr>`
                    : ""
                }
              </table>
            </td>
          </tr>

          <!-- Main Content Section -->
          <tr>
            <td class="content-padding" style="padding: 32px 36px; font-size: 15px; line-height: 1.6; color: #334155;">
              ${content}
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="font-size: 13px; font-weight: 600; color: #475569; padding-bottom: 6px;">
                    Egyzon &bull; Egypt's Leading Multi-Vendor Marketplace
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-size: 12px; color: #64748b; line-height: 1.5; padding-bottom: 12px;">
                    Fast nationwide delivery &bull; Buyer Escrow Protection &bull; Verified sellers
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-size: 11px; color: #94a3b8; line-height: 1.4;">
                    This is an automated notification from Egyzon. Please do not reply directly to this email.<br/>
                    &copy; ${currentYear} Egyzon. All rights reserved.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
