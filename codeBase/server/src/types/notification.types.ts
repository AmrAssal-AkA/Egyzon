type NotificationType =
  | "info"
  | "warning"
  | "error"
  | "success"
  | "partner_Applicant"
  | "new_order";

export type createNotificationInput = {
  user: string;
  title?: string;
  type: NotificationType;
  message: string;
  isRead?: boolean;
  createdAt?: Date;
};
export interface Notification {
  user: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface PartnerApplicant {
  applicantId: string;
  applicationId: string;
  applicantName: string;
  shopName: string;
}
