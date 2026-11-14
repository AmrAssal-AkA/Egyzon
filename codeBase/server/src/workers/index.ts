import {Worker} from "bullmq";
import mongoose from "mongoose";

import {getQueueConnection } from "../config/client";
import logger from "../utils/logger";
import emailProcessor from "./email.processor";


export async function startEmailWorker() {
    await mongoose.connect(process.env.MONGO_URI as string);

    const worker = [
        new Worker('email', emailProcessor, {
            connection: getQueueConnection(),
            concurrency: 5,
            limiter: {max: 50, duration: 1000},
        }),
    ]

    worker.forEach(w => {
        w.on('completed', (job) => logger.info(`[${w.name}] Job ${job?.id} (${job?.name}) has completed`));
        w.on('failed', (job, err) => logger.error(`Job ${job?.id} has failed with ${err.message}`));
    });

    const shutdown = async () => {
        await Promise.all(worker.map(w => w.close()));
        await mongoose.disconnect();
        process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
}