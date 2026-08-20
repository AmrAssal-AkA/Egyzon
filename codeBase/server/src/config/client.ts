import {createClient, type RedisClientType} from 'redis';

let client: RedisClientType | null = null;

export async function initializeRedisClient() {
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
    if (!client){
        client = createClient({url: redisUrl});
        client.on("error", (err) => console.log("Redis Client Error", err));
        client.on("connect", () => console.log("Redis Client Connected"));
        await client.connect();
    }
    return client;
}