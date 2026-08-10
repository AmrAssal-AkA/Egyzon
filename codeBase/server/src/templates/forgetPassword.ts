import sendnoReplayEmail from "../config/sendEmail";

export const forgetPasswordTemplate = async (to: string, token: string, resetPasswordUrl: string) => {
    return await sendnoReplayEmail(
        to,
        "Reset your password",
        `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; text-align: center; padding: 20px;">
        <p>We received a request to reset your password. Please click the link below to reset your password:</p>
        <a style="background-color:black; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 4px;" href="${resetPasswordUrl}">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Best regards,</p>
        <p>The Team</p>
        <p>Note: Please do not reply to this email. This is an automated message.</p>
        <p>This link will expire in 1 hour.</p>
        </div>`
    )
}