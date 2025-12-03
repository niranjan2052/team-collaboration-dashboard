// src/server.ts
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { prisma } from "./config/db.js";

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to MySQL");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();
