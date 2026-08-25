"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderReceivedConfirmationEmail = void 0;
const sendEmail_1 = __importDefault(require("../config/sendEmail"));
const sendOrderReceivedConfirmationEmail = async (order) => {
    const { customerEmail, orderId, orderItems, totalAmount } = order;
    const emailSubject = "Order Received Confirmation";
    const emailBody = `
    <h1>Thank you for your order!</h1>
    <p>Your order with ID <strong>${orderId}</strong> has been received.</p>
    <p>Order Details:</p>
    <ul>
      ${orderItems
        .map((item) => `<li>${item.productName} - Quantity: ${item.quantity} - Price: $${item.unitPrice}</li>`)
        .join("")}
    </ul>
    <p>Total Amount: <strong>$${totalAmount}</strong></p>
    <p>We will notify you once your order is shipped.</p>
  `;
    try {
        await (0, sendEmail_1.default)(customerEmail, emailSubject, emailBody);
    }
    catch (error) {
        console.error("Error sending order received confirmation email:", error.message);
    }
};
exports.sendOrderReceivedConfirmationEmail = sendOrderReceivedConfirmationEmail;
//# sourceMappingURL=orderReceivedConfirmationTem.js.map