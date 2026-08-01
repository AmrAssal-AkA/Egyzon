import sendEmail from "../config/sendEmail";



const verifyEmailTemplate = async (to: string, token: string, verificationUrl: string) => {
    return await sendEmail(
        to,
        "Verify your email",
        `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; text-align: center; padding: 20px;">
        <p>Thank you for registering. Please verify your email by clicking the link below:</p>
        <a style="background-color:black; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 4px;" href="${verificationUrl}">Verify Email</a>
        <p>If you did not register, please ignore this email.</p>
        <p>Best regards,</p>
        <p>The Team</p>
        <p>Note: Please do not reply to this email. This is an automated message.</p>
        <p>If you have any questions or need assistance, please contact our support team.</p>
        <p>This link will expire in 1 hour.</p>
        </div>`
    )
}

export default verifyEmailTemplate;