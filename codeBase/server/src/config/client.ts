import {createClient, type RedisClientType} from 'redis';

import looger from '../utils/logger';

let client: RedisClientType | null = null;

export async function initializeRedisClient() {
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
    if (!client){
        client = createClient({url: redisUrl});
        client.on("error", (err) => looger.error("Redis Client Error", err));
        client.on("connect", () => looger.info("Redis Client Connected"));
        await client.connect();
    }
    return client;
}