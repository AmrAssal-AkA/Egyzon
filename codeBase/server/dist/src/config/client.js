"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeRedisClient = initializeRedisClient;
const redis_1 = require("redis");
let client = null;
async function initializeRedisClient() {
    if (!client) {
        client = (0, redis_1.createClient)();
        client.on("error", (err) => console.log("Redis Client Error", err));
        client.on("connect", () => console.log("Redis Client Connected"));
        await client.connect();
    }
    return client;
}
//# sourceMappingURL=client.js.map