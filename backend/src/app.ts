// src/app.ts
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import "./config/mongo.js"; // initialize Mongo connection

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// main API
app.use("/api", apiRouter);

// error handler (must be last)
app.use(errorHandler);

export default app;
