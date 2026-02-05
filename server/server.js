import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

import connectDb from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// ================= MIDDLEWARES =================
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);

// ================= STATIC FILES =================
// 🔥 VERY IMPORTANT: serve uploaded images
app.use("/uploads", express.static("uploads"));

// ================= DATABASE =================
await connectDb();

// ================= ROUTES =================
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server started at port: ${PORT}`)
);
