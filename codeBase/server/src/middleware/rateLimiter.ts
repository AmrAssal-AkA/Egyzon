import RedisStore from "rate-limit-redis";

import rateLimit, {ipKeyGenerator} from "express-rate-limit";
import {initializeRedisClient} from "../config/client";
import { RateLimitKey } from "../utils/keys";
import logger from "../utils/logger";

const redisClientPromise = initializeRedisClient();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    skipSuccessfulRequests: true, 
    store: new RedisStore({
        sendCommand: (...args: string[]) => redisClientPromise.then(client => client.sendCommand(args)),
    }),
    keyGenerator: (req) => {
        const rawIp = req.ip ?? req.socket?.remoteAddress;
        const ip = ipKeyGenerator(rawIp ?? "unknown");
        return RateLimitKey(ip);
    },
    message: "Too many login attempts from this IP, please try again after 15 minutes",
    handler: (req, res, next, options) => {
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(options.statusCode).json({ error: options.message });
    }
});

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 50,
    skipSuccessfulRequests: true,
    standardHeaders: 'draft-8', 
    legacyHeaders: false,
    store: new RedisStore({
        sendCommand: (...args: string[]) => redisClientPromise.then(client => client.sendCommand(args)),
    }),
    keyGenerator: (req) => {
        const ip = ipKeyGenerator(req.ip ?? req.socket?.remoteAddress ?? "unknown");
        return RateLimitKey(ip);
    },
    handler: (req, res, next, options) => {
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(options.statusCode).json({ error: options.message });
    },
    message: "Too many requests from this IP, please try again after 15 minutes",
});

const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 10,
    skipSuccessfulRequests: true,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    store: new RedisStore({
        sendCommand: (...args: string[]) => redisClientPromise.then(client => client.sendCommand(args)),
    }),
    keyGenerator: (req) => {
        const ip = ipKeyGenerator(req.ip ?? req.socket?.remoteAddress ?? "unknown");
        return RateLimitKey(ip);
    },
    handler: (req, res, next, options) => {
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(options.statusCode).json({ error: options.message });
    },
    message: "Too many upload requests from this IP, please try again after 15 minutes",
});

export { authLimiter, generalLimiter, uploadLimiter };
