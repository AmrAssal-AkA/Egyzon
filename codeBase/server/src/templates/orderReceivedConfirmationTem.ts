import sendnoReplayEmail from "../config/sendEmail";

export const sendOrderReceivedConfirmationEmail = async (order: any) => {
  const { customerEmail, orderId, orderItems, totalAmount } = order;

  const emailSubject = "Order Received Confirmation";
  const emailBody = `
    <h1>Thank you for your order!</h1>
    <p>Your order with ID <strong>${orderId}</strong> has been received.</p>
    <p>Order Details:</p>
    <ul>
      ${orderItems
        .map(
          (item: any) =>
            `<li>${item.productName} - Quantity: ${item.quantity} - Price: $${item.unitPrice}</li>`
        )
        .join("")}
    </ul>
    <p>Total Amount: <strong>$${totalAmount}</strong></p>
    <p>We will notify you once your order is shipped.</p>
  `;

  try {
    await sendnoReplayEmail(customerEmail, emailSubject, emailBody);
  } catch (error) {
    console.error(
      "Error sending order received confirmation email:",
      (error as Error).message
    );
  }
};