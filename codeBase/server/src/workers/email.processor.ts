import { Job, UnrecoverableError } from "bullmq";

import { emailJobs } from "../types/jobs.types";
import { sendEmail } from "../services/email";
import User from "../models/userModel";
import logger from "../utils/logger";

type Handlers = {
  [K in keyof emailJobs]?: (data: emailJobs[K]) => Promise<void>;
};

const handlers: Handlers = {
  verifyEmail: async ({ userId, to, verificationUrl }) => {
    try {
      let recipientEmail = to;
      let userName: string | undefined;

      if (userId) {
        const user = await User.findById(userId);
        if (!user && !to) {
          throw new UnrecoverableError(`User not found for verifyEmail job (userId: ${userId})`);
        }
        if (user) {
          recipientEmail = recipientEmail || user.email;
          userName = user.FirstName;
        }
      } else if (to) {
        const user = await User.findOne({ email: to });
        if (user) {
          userName = user.FirstName;
        }
      }

      if (!recipientEmail) {
        throw new UnrecoverableError("Recipient email address is required for verifyEmail job");
      }

      if (!verificationUrl) {
        throw new UnrecoverableError("verificationUrl is required for verifyEmail job");
      }

      await sendEmail({
        to: recipientEmail,
        template: "verifyEmail",
        context: {
          name: userName,
          verificationUrl,
        },
      });
    } catch (error) {
      if (error instanceof UnrecoverableError) throw error;
      logger.error(`Error in verifyEmail job:`, error);
      throw error;
    }
  },

  forgetPassword: async ({ emailAddress, to, token, resetPasswordUrl }) => {
    try {
      const email = emailAddress || to;
      if (!email) {
        throw new UnrecoverableError("Email address is required for forgetPassword job");
      }
      if (!resetPasswordUrl) {
        throw new UnrecoverableError("resetPasswordUrl is required for forgetPassword job");
      }

      const user = await User.findOne({ email });
      const name = user?.FirstName;

      await sendEmail({
        to: email,
        template: "forgetPassword",
        context: {
          name,
          token,
          resetPasswordUrl,
        },
      });
    } catch (error) {
      if (error instanceof UnrecoverableError) throw error;
      logger.error(`Error in forgetPassword job:`, error);
      throw error;
    }
  },

  changePassword: async ({ to, name, token, resetPasswordUrl }) => {
    try {
      if (!to) {
        throw new UnrecoverableError("Recipient email ('to') is required for changePassword job");
      }

      let displayName = name;
      if (!displayName) {
        const user = await User.findOne({ email: to });
        displayName = user?.FirstName;
      }

      await sendEmail({
        to,
        template: "changePassword",
        context: {
          name: displayName,
          token,
          resetPasswordUrl,
        },
      });
    } catch (error) {
      if (error instanceof UnrecoverableError) throw error;
      logger.error(`Error in changePassword job:`, error);
      throw error;
    }
  },

  sellerApplyApplicant: async ({ to, applicantName, storeName }) => {
    try {
      if (!to || !storeName) {
        throw new UnrecoverableError("Missing required fields (to, storeName) for sellerApplyApplicant job");
      }

      await sendEmail({
        to,
        template: "sellerApplyApplicant",
        context: {
          applicantName,
          storeName,
        },
      });
    } catch (error) {
      if (error instanceof UnrecoverableError) throw error;
      logger.error(`Error in sellerApplyApplicant job:`, error);
      throw error;
    }
  },

  sellerApplyApproval: async ({ to, applicantName, storeName }) => {
    try {
      if (!to || !storeName) {
        throw new UnrecoverableError("Missing required fields (to, storeName) for sellerApplyApproval job");
      }

      await sendEmail({
        to,
        template: "sellerApplyApproval",
        context: {
          applicantName,
          storeName,
        },
      });
    } catch (error) {
      if (error instanceof UnrecoverableError) throw error;
      logger.error(`Error in sellerApplyApproval job:`, error);
      throw error;
    }
  },

  orderReceivedConfirmation: async ({ to, order }) => {
    try {
      const recipient =
        to ||
        order?.customerEmail ||
        order?.customer?.email ||
        order?.billingData?.email ||
        order?.email;

      if (!recipient) {
        throw new UnrecoverableError("Recipient email is required for orderReceivedConfirmation job");
      }

      await sendEmail({
        to: recipient,
        template: "orderReceivedConfirmation",
        context: {
          order,
        },
      });
    } catch (error) {
      if (error instanceof UnrecoverableError) throw error;
      logger.error(`Error in orderReceivedConfirmation job:`, error);
      throw error;
    }
  },

  orderReceived: async ({ to, order }) => {
    try {
      const recipient =
        to ||
        order?.customerEmail ||
        order?.customer?.email ||
        order?.billingData?.email ||
        order?.email;

      if (!recipient) {
        throw new UnrecoverableError("Recipient email is required for orderReceived job");
      }

      await sendEmail({
        to: recipient,
        template: "orderReceived",
        context: {
          order,
        },
      });
    } catch (error) {
      if (error instanceof UnrecoverableError) throw error;
      logger.error(`Error in orderReceived job:`, error);
      throw error;
    }
  },

  admin: async ({ to, subject, template, context, html }) => {
    try {
      const recipient = to || process.env.ADMIN_EMAIL || process.env.GMAIL_EMAIL;
      if (!recipient) {
        throw new UnrecoverableError("Recipient email is required for admin email job");
      }

      await sendEmail({
        to: recipient,
        subject: subject || "Admin Notification - Egyzon",
        template,
        context,
        html,
      });
    } catch (error) {
      if (error instanceof UnrecoverableError) throw error;
      logger.error(`Error in admin email job:`, error);
      throw error;
    }
  },
};

export default async function emailProcessor(job: Job<emailJobs[keyof emailJobs]>) {
  const handler = handlers[job.name as keyof emailJobs] as ((d: unknown) => Promise<void>) | undefined;
  if (!handler) throw new UnrecoverableError(`No handler found for job: ${job.name}`);
  await handler(job.data);
}
