import { sendEmail } from "../services/email";
import { renderEmailLayout, renderButton, renderInfoBox } from "./emailLayout";

export const sendOrderReceivedConfirmationEmail = async (order: any) => {
  const customerEmail =
    order.customerEmail ||
    order.customer?.email ||
    order.billingData?.email ||
    order.email;

  const displayOrderId =
    order.orderNumber || order.orderId || order._id?.toString() || "N/A";

  const totalAmount =
    order.totalAmount !== undefined && order.totalAmount !== null
      ? Number(order.totalAmount).toFixed(2)
      : "0.00";

  const items = Array.isArray(order.orderItems) ? order.orderItems : [];
  const frontendUrl = process.env.FRONTEND_URL || "https://egyzon.com";
  const orderTrackUrl = `${frontendUrl}/orders`;

  const orderDate = order.orderDate
    ? new Date(order.orderDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

  // Build items rows
  const itemsRows = items
    .map((item: any, idx: number) => {
      const name =
        item.productName ||
        item.product?.productName ||
        item.name ||
        item.product?.name ||
        `Item #${idx + 1}`;
      const qty = item.quantity || 1;
      const unitPrice =
        item.unitPrice !== undefined
          ? Number(item.unitPrice).toFixed(2)
          : item.price !== undefined
            ? Number(item.price).toFixed(2)
            : "0.00";
      const lineTotal =
        item.total !== undefined
          ? Number(item.total).toFixed(2)
          : (Number(unitPrice) * qty).toFixed(2);

      return `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b; vertical-align: top;">
            <div style="font-weight: 600;">${name}</div>
            <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Qty: ${qty} &times; $${unitPrice}</div>
          </td>
          <td align="right" style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #0f172a; vertical-align: top;">
            $${lineTotal}
          </td>
        </tr>
      `;
    })
    .join("");

  // Build financial breakdown
  const subTotalRow =
    order.subTotal !== undefined
      ? `
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #64748b;">Subtotal</td>
          <td align="right" style="padding: 6px 0; font-size: 13px; color: #0f172a;">$${Number(order.subTotal).toFixed(2)}</td>
        </tr>`
      : "";

  const shippingRow =
    order.shippingFee !== undefined
      ? `
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #64748b;">Shipping</td>
          <td align="right" style="padding: 6px 0; font-size: 13px; color: #0f172a;">${
            Number(order.shippingFee) === 0
              ? "Free"
              : `$${Number(order.shippingFee).toFixed(2)}`
          }</td>
        </tr>`
      : "";

  const discountRow =
    order.discount && Number(order.discount) > 0
      ? `
        <tr>
          <td style="padding: 6px 0; font-size: 13px; color: #16a34a;">Discount</td>
          <td align="right" style="padding: 6px 0; font-size: 13px; color: #16a34a;">-$${Number(order.discount).toFixed(2)}</td>
        </tr>`
      : "";

  const content = `
    <div style="text-align: left;">
      <h1 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 700; color: #0f172a; line-height: 1.3;">
        Thank You For Your Order!
      </h1>
      
      <p style="margin: 0 0 20px 0; color: #475569; font-size: 15px; line-height: 1.6;">
        We have received your order and are currently preparing it for shipment. You will receive a shipping confirmation email with tracking details once it's on the way.
      </p>

      <!-- Order Metadata Card -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin: 0 0 24px 0;">
        <tr>
          <td style="padding: 16px 20px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="font-size: 13px; color: #64748b;">
                  Order Number: <strong style="color: #0f172a;">${displayOrderId}</strong>
                </td>
                <td align="right" style="font-size: 13px; color: #64748b;">
                  Date: <strong style="color: #0f172a;">${orderDate}</strong>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- Order Items Receipt Table -->
      <div style="font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 12px;">
        Order Summary
      </div>

      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
        <thead>
          <tr>
            <th align="left" style="padding-bottom: 8px; border-bottom: 2px solid #e2e8f0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Item</th>
            <th align="right" style="padding-bottom: 8px; border-bottom: 2px solid #e2e8f0; font-size: 12px; font-weight: 600; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>

      <!-- Totals Summary Table -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
        ${subTotalRow}
        ${shippingRow}
        ${discountRow}
        <tr>
          <td style="padding: 12px 0 0 0; border-top: 2px solid #e2e8f0; font-size: 16px; font-weight: 700; color: #0f172a;">Total Amount</td>
          <td align="right" style="padding: 12px 0 0 0; border-top: 2px solid #e2e8f0; font-size: 18px; font-weight: 800; color: #2563eb;">$${totalAmount}</td>
        </tr>
      </table>

      ${renderInfoBox({
        title: "Egyzon Buyer Escrow Protection",
        content:
          "Your payment is securely held in escrow until you successfully receive your order in satisfactory condition.",
        bgColor: "#eff6ff",
        borderColor: "#dbeafe",
        titleColor: "#1e40af",
      })}

      ${renderButton({
        text: "Track Your Order",
        url: orderTrackUrl,
        bgColor: "#2563eb",
      })}

      <p style="margin: 20px 0 0 0; font-size: 13px; color: #64748b; line-height: 1.5; text-align: center;">
        Have a question about your order? Visit our <a href="${frontendUrl}/contact" style="color: #2563eb; text-decoration: underline;">Help Center</a>.
      </p>
    </div>
  `;

  try {
    await sendEmail({
      to: customerEmail,
      subject: `Order Confirmation #${displayOrderId} - Egyzon`,
      html: renderEmailLayout({
        title: `Order Confirmation #${displayOrderId} - Egyzon`,
        previewText: `Thank you for your order! Order #${displayOrderId} has been received.`,
        badge: {
          text: "Order Confirmed",
          bgColor: "#eff6ff",
          textColor: "#1d4ed8",
        },
        content,
      }),
    });
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
    throw new Error("Failed to send order confirmation email");
  }
};
