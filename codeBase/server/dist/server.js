"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = __importDefault(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config();
//imports routes and configs
const db_1 = __importDefault(require("./src/config/db"));
const auth_route_1 = __importDefault(require("./src/routes/auth.route"));
const product_route_1 = __importDefault(require("./src/routes/product.route"));
const wishlist_route_1 = __importDefault(require("./src/routes/wishlist.route"));
const seller_route_1 = __importDefault(require("./src/routes/seller.route"));
const cart_route_1 = __importDefault(require("./src/routes/cart.route"));
const category_routes_1 = __importDefault(require("./src/routes/category.routes"));
const swagger_1 = require("./src/docs/swagger");
const customer_route_1 = __importDefault(require("./src/routes/customer.route"));
const admin_route_1 = __importDefault(require("./src/routes/admin.route"));
const socket_1 = require("./src/config/socket");
const attachTo_1 = require("./src/middleware/attachTo");
const order_route_1 = __importDefault(require("./src/routes/order.route"));
const notifaication_routes_1 = __importDefault(require("./src/routes/notifaication.routes"));
const payment_route_1 = __importDefault(require("./src/routes/payment.route"));
const rateLimiter_1 = require("./src/middleware/rateLimiter");
const requestLogger_1 = __importDefault(require("./src/middleware/requestLogger"));
const logger_1 = __importDefault(require("./src/utils/logger"));
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const io = (0, socket_1.initSocket)(httpServer);
const allowedOrigin = "http://localhost:3000";
const PORT = process.env.PORT;
//connect to db
(0, db_1.default)();
//middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
}));
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use((0, attachTo_1.attachTo)(io));
app.use(requestLogger_1.default);
app.set('trust proxy', 1);
//routes
app.use("/api/auth", rateLimiter_1.authLimiter, auth_route_1.default);
app.use("/api/product", rateLimiter_1.generalLimiter, product_route_1.default);
app.use("/api/wishlist", rateLimiter_1.generalLimiter, wishlist_route_1.default);
app.use("/api/seller", rateLimiter_1.generalLimiter, seller_route_1.default);
app.use("/api/cart", rateLimiter_1.generalLimiter, cart_route_1.default);
app.use("/api/category", rateLimiter_1.generalLimiter, category_routes_1.default);
app.use("/api/customer", rateLimiter_1.generalLimiter, customer_route_1.default);
app.use("/api/admin", rateLimiter_1.generalLimiter, admin_route_1.default);
app.use('/api/order', rateLimiter_1.generalLimiter, order_route_1.default);
app.use('/api/notifications', notifaication_routes_1.default);
app.use('/api/payment', payment_route_1.default);
//swagger
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
//default route
app.get("/", (req, res) => {
    res.send("egyzon server is running");
});
app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "public, max-age=0");
    res.send(swagger_1.swaggerSpec);
});
//start the server
httpServer.listen(PORT, () => {
    logger_1.default.info(`Server is running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map