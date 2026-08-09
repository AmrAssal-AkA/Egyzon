"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
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
const app = (0, express_1.default)();
const PORT = process.env.PORT;
//connect to db
(0, db_1.default)();
//middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: "*", credentials: true }));
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
//routes
app.use("/api/auth", auth_route_1.default);
app.use("/api/product", product_route_1.default);
app.use("/api/wishlist", wishlist_route_1.default);
app.use("/api/seller", seller_route_1.default);
app.use("/api/cart", cart_route_1.default);
app.use("/api/category", category_routes_1.default);
app.use("/api/customer", customer_route_1.default);
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
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map