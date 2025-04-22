// db/connection.js

const mongoose = require("mongoose");

// Load environment variables from .env file
// Note: This only works locally. On platforms like Railway, env vars are injected at runtime.
require("dotenv").config();

/**
 * Connects to MongoDB using Mongoose.
 * In production (e.g., Railway), ensure MONGODB_URI is defined in the environment.
 */
const connectToDB = async () => {
  try {
    console.log("🔄 Attempting to connect to MongoDB...");
    console.log("📦 Loaded URI:", process.env.MONGODB_URI);

    // Optional: validate MONGODB_URI exists before attempting to connect
    if (!process.env.MONGODB_URI) {
      throw new Error("Missing MONGODB_URI in environment variables.");
    }

    // Connect to the database using the URI
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);

    // Warning only — allows the server to continue running without DB (e.g., for local dev)
    // Consider throwing error here in production if DB is critical to functionality
    console.warn("⚠️ Continuing without DB connection (handle with care)");
  }
};

module.exports = connectToDB;
