
import sendnoReplayEmail from "../config/sendEmail";

const changePasswordTemplate = async (to: string, name: string) => {
    await sendnoReplayEmail(
        to,
        "Change Password",
        `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; text-align: center; padding: 20px;">
        <p>Dear ${name},</p>
        <p>Your password has been successfully changed.</p>
        <p>If you did not initiate this change, please contact our support team immediately.</p>
        <p>Best regards,</p>
        <p>The Team</p>
        <p>Note: Please do not reply to this email. This is an automated message.</p>
        </div>`
    )

}

export default changePasswordTemplate;
