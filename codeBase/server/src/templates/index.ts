import { AppError } from "../utils/AppError";
import { renderVerifyEmailTemplate, VerifyEmailContext } from "./verifyEmailTemplate";
import { renderForgetPasswordTemplate, ForgetPasswordContext } from "./forgetPassword";
import { renderChangePasswordTemplate, ChangePasswordContext } from "./changePasswordTemp";
import {
  renderSellerApplyApplicantTemplate,
  renderSellerApplyApprovalTemplate,
  SellerApplyApplicantContext,
  SellerApplyApprovalContext,
} from "./SellerApplyApplicant";
import {
  renderOrderReceivedConfirmationTemplate,
  OrderReceivedConfirmationContext,
} from "./orderReceivedConfirmationTem";

export {
  renderVerifyEmailTemplate,
  renderForgetPasswordTemplate,
  renderChangePasswordTemplate,
  renderSellerApplyApplicantTemplate,
  renderSellerApplyApprovalTemplate,
  renderOrderReceivedConfirmationTemplate,
};

export const emailTemplates = {
  verifyEmail: (ctx: VerifyEmailContext) => renderVerifyEmailTemplate(ctx),
  forgetPassword: (ctx: ForgetPasswordContext) => renderForgetPasswordTemplate(ctx),
  changePassword: (ctx: ChangePasswordContext) => renderChangePasswordTemplate(ctx),
  sellerApplyApplicant: (ctx: SellerApplyApplicantContext) =>
    renderSellerApplyApplicantTemplate(ctx),
  sellerApplyApproval: (ctx: SellerApplyApprovalContext) =>
    renderSellerApplyApprovalTemplate(ctx),
  orderReceivedConfirmation: (ctx: OrderReceivedConfirmationContext) =>
    renderOrderReceivedConfirmationTemplate(ctx),
  orderReceived: (ctx: OrderReceivedConfirmationContext) =>
    renderOrderReceivedConfirmationTemplate(ctx),
};

export type EmailTemplateName = keyof typeof emailTemplates;

export const renderTemplate = (
  templateName: string,
  context: Record<string, any> = {},
): { subject: string; html: string } => {
  const templateFn = emailTemplates[templateName as EmailTemplateName];
  if (!templateFn) {
    throw new AppError(400, `Unknown email template: "${templateName}"`);
  }
  return templateFn(context as any);
};
