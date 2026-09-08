import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
dotenv.config();

//imports routes and configs
import connectDB from "./src/config/db";
import AuthentaicatingRoute from "./src/routes/auth.route";
import productRoute from "./src/routes/product.route";
import wishlistRoute from "./src/routes/wishlist.route";
import sellerRoute from "./src/routes/seller.route";
import cartRoute from "./src/routes/cart.route";
import CategoryRoute from "./src/routes/category.routes";
import { swaggerSpec } from "./src/docs/swagger";
import customerRoute from "./src/routes/customer.route";
import adminRoute from "./src/routes/admin.route";
import { initSocket } from "./src/config/socket";
import { attachTo } from "./src/middleware/attachTo";
import orderRoute from "./src/routes/order.route";
import NotificationRoute from "./src/routes/notifaication.routes";
import PaymentRoute from "./src/routes/payment.route";
import { generalLimiter} from "./src/middleware/rateLimiter"
import morganMiddleware from "./src/middleware/requestLogger";
import walletRoute from "./src/routes/wallet.route"
import logger from "./src/utils/logger";


const app = express();
const httpServer = http.createServer(app);
const io = initSocket(httpServer);
const allowedOrigin = "http://localhost:3000";



const PORT = process.env.PORT;
//connect to db
connectDB();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);
app.use(helmet());
app.use(cookieParser());
app.use(attachTo(io));
app.use(morganMiddleware);
app.set('trust proxy', 1);


//routes
app.use("/api/auth", AuthentaicatingRoute);
app.use("/api/product",generalLimiter, productRoute);
app.use("/api/wishlist", generalLimiter, wishlistRoute);
app.use("/api/seller", generalLimiter, sellerRoute);
app.use("/api/cart", generalLimiter, cartRoute);
app.use("/api/category", generalLimiter, CategoryRoute);
app.use("/api/customer", generalLimiter, customerRoute);
app.use("/api/admin", adminRoute);
app.use('/api/order', generalLimiter, orderRoute);
app.use('/api/notifications', NotificationRoute);
app.use('/api/payment', PaymentRoute);
app.use('/api/wallet', walletRoute)
//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//default route
app.get("/", (req, res) => {
  res.send("egyzon server is running");
});

app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "public, max-age=0");
  res.send(swaggerSpec);
});

//start the server
httpServer.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app;
