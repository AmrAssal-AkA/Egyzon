import { Queue, JobsOptions } from "bullmq";
import { getQueueConnection } from "../config/client";
import { emailJobs, notificationJobs } from "../types/jobs.types";

const defaultJobOptions: JobsOptions = {
  attempts: 5,
  backoff: {
    type: "exponential",
    delay: 500,
  },
  removeOnComplete: { age: 3600, count: 1000 },
  removeOnFail: { age: 7 * 24 * 3200 },
};

type EmailJobData = emailJobs[keyof emailJobs];
type NotificationJobData = notificationJobs[keyof notificationJobs];

export const emailQueue = new Queue<EmailJobData>("email", {connection: getQueueConnection(), defaultJobOptions});
export const notificationQueue = new Queue<NotificationJobData>("notification", {connection: getQueueConnection(), defaultJobOptions});

export const enqueueEmail = <k extends keyof emailJobs>(jobName: k, data: emailJobs[k], options?: JobsOptions) => {
  return emailQueue.add(jobName as string, data, options);
};

export const enqueueNotification = <k extends keyof notificationJobs>(jobName: k, data: notificationJobs[k], options?: JobsOptions) => {
    return notificationQueue.add(jobName as string, data, options);
}


