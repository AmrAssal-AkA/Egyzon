"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadLimiter = exports.generalLimiter = exports.authLimiter = void 0;
const rate_limit_redis_1 = __importDefault(require("rate-limit-redis"));
const express_rate_limit_1 = __importStar(require("express-rate-limit"));
const client_1 = require("../config/client");
const keys_1 = require("../utils/keys");
const logger_1 = __importDefault(require("../utils/logger"));
const redisClientPromise = (0, client_1.initializeRedisClient)();
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    skipSuccessfulRequests: true,
    store: new rate_limit_redis_1.default({
        sendCommand: (...args) => redisClientPromise.then(client => client.sendCommand(args)),
    }),
    keyGenerator: (req) => {
        const ip = (0, express_rate_limit_1.ipKeyGenerator)(req.ip ?? req.socket?.remoteAddress ?? "unknown");
        return (0, keys_1.RateLimitKey)(ip);
    },
    message: "Too many login attempts from this IP, please try again after 15 minutes",
    handler: (req, res, next, options) => {
        logger_1.default.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(options.statusCode).json({ error: options.message });
    }
});
exports.authLimiter = authLimiter;
const generalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 50,
    skipSuccessfulRequests: true,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    store: new rate_limit_redis_1.default({
        sendCommand: (...args) => redisClientPromise.then(client => client.sendCommand(args)),
    }),
    keyGenerator: (req) => {
        const ip = (0, express_rate_limit_1.ipKeyGenerator)(req.ip ?? req.socket?.remoteAddress ?? "unknown");
        return (0, keys_1.RateLimitKey)(ip);
    },
    handler: (req, res, next, options) => {
        logger_1.default.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(options.statusCode).json({ error: options.message });
    },
    message: "Too many requests from this IP, please try again after 15 minutes",
});
exports.generalLimiter = generalLimiter;
const uploadLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    skipSuccessfulRequests: true,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    store: new rate_limit_redis_1.default({
        sendCommand: (...args) => redisClientPromise.then(client => client.sendCommand(args)),
    }),
    keyGenerator: (req) => {
        const ip = (0, express_rate_limit_1.ipKeyGenerator)(req.ip ?? req.socket?.remoteAddress ?? "unknown");
        return (0, keys_1.RateLimitKey)(ip);
    },
    handler: (req, res, next, options) => {
        logger_1.default.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(options.statusCode).json({ error: options.message });
    },
    message: "Too many upload requests from this IP, please try again after 15 minutes",
});
exports.uploadLimiter = uploadLimiter;
//# sourceMappingURL=rateLimiter.js.map