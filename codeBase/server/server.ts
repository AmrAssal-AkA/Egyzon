import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
dotenv.config();

//imports routes and configs
import connectDB from "./src/config/db";
import AuthentaicatingRoute from './src/routes/auth.route';
import productRoute from './src/routes/product.route';
import wishlistRoute from './src/routes/wishlist.route';
import sellerRoute from './src/routes/seller.route';
import cartRoute from './src/routes/cart.route';
import CategoryRoute from './src/routes/category.routes';
import { swaggerSpec } from "./src/docs/swagger";
import customerRoute from "./src/routes/customer.route";
import adminRoute from "./src/routes/admin.route";

const app = express();
const PORT = process.env.PORT;

//connect to db
connectDB();
//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));
app.use(helmet());
app.use(cookieParser());


//routes
app.use("/api/auth", AuthentaicatingRoute);
app.use("/api/product", productRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/seller", sellerRoute);
app.use("/api/cart", cartRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/customer", customerRoute);
app.use("/api/admin", adminRoute);

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
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
