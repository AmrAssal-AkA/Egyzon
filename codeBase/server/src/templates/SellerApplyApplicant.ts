import sendnoReplayEmail from "../config/sendEmail";;

export const SellerApplyApplicantTemplate = async (to: string, applicantName: string, storeName: string) => {
    await sendnoReplayEmail (
        to,
        "Seller Applicant",
        `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; text-align: center; padding: 20px;">
        <p>Dear ${applicantName},</p>
        <p>Thank you for applying to become a seller on our platform. We have received your application for the store "${storeName}".</p>
        <p>Our team will review your application and get back to you shortly.</p>
        <p>If you have any questions or need assistance, please contact our support team.</p>
        <p>Best regards,</p>
        <p>The Team</p>
        <p>Note: Please do not reply to this email. This is an automated message.</p>
        </div>`
    )
}