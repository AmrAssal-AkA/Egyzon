import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.send("Egyzon Server is running");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export default app;
