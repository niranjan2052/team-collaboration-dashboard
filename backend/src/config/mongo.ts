// src/config/mongo.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
  console.warn("⚠️ MONGO_URI not set. MongoDB will not be connected.");
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
}

export default mongoose;
