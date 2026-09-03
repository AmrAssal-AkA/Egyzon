"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRedisClient = initializeRedisClient;
const redis_1 = require("redis");
const logger_1 = __importDefault(require("../utils/logger"));
let client = null;
async function initializeRedisClient() {
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
    if (!client) {
        client = (0, redis_1.createClient)({ url: redisUrl });
        client.on("error", (err) => logger_1.default.error("Redis Client Error", err));
        client.on("connect", () => logger_1.default.info("Redis Client Connected"));
        await client.connect();
    }
    return client;
}
//# sourceMappingURL=client.js.map