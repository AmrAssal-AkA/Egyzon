export interface ChangePasswordEmailJob {
   to: string;
   name?: string;
   token?: string;
   resetPasswordUrl?: string;
}

export interface ForgetPasswordEmailJob {
   to?: string;
   emailAddress?: string;
   token: string;
   resetPasswordUrl: string;
}

export interface VerifyEmailJob {
   to?: string;
   verificationUrl?: string;
   userId?: string;
   [key: string]: any;
}

export interface OrderReceivedEmailJob {
   to?: string;
   orderId?: string;
   orderDetailsUrl?: string;
   order?: any;
   [key: string]: any;
}

export interface SellerApplyApplicantEmailJob {
   to: string;
   applicantName: string;
   storeName: string;
}

export interface SellerApplyApprovalEmailJob {
   to: string;
   applicantName: string;
   storeName: string;
}

export interface AdminEmailJob {
   to?: string;
   subject?: string;
   template?: string;
   context?: Record<string, any>;
   [key: string]: any;
}

export interface emailJobs {
   changePassword: ChangePasswordEmailJob;
   forgetPassword: ForgetPasswordEmailJob;
   verifyEmail: VerifyEmailJob;
   orderReceived: OrderReceivedEmailJob;
   orderReceivedConfirmation: OrderReceivedEmailJob;
   sellerApplyApplicant: SellerApplyApplicantEmailJob;
   sellerApplyApproval: SellerApplyApprovalEmailJob;
   admin: AdminEmailJob;
}

export interface AdminNotificationJob {
   type: string;
   message: string;
   data?: Record<string, any>;
   [key: string]: any;
}

export interface notificationJobs {
   admin: AdminNotificationJob;
   [key: string]: any;
}

export type EmailJobName = keyof emailJobs;
export type EmailJobData<T extends EmailJobName> = emailJobs[T];

export type NotificationJobNameType = keyof notificationJobs;
export type NotificationJobDataType<T extends NotificationJobName> = notificationJobs[T];


export type NotificationJobName = keyof notificationJobs;
export type NotificationJobData<T extends NotificationJobName> = notificationJobs[T];