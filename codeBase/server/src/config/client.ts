import { createClient, type RedisClientType } from 'redis';
import { createNodeRedisClient } from "bullmq";
import logger from '../utils/logger';

let client: RedisClientType | null = null;

export async function initializeRedisClient() {
    const redisUrl = process.env.REDIS_URL as string;
    if (!client) {
        client = createClient({ url: redisUrl });
        client.on("error", (err) => logger.error("Redis Client Error", err));
        client.on("connect", () => logger.info("Redis Client Connected"));
        await client.connect();
    }
    return client;
}

let queueConnection: ReturnType<typeof createNodeRedisClient> | null = null;

export function getQueueConnection() {
    if (!queueConnection) {
        const redisUrl = process.env.REDIS_URL as string;
        const raw = createClient({ url: redisUrl });
        raw.on("error", (err) => logger.error("Redis Queue Client Error", err));
        queueConnection = createNodeRedisClient(raw);
    }
    return queueConnection;
}
