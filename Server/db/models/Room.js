// db/models/Room.js

const mongoose = require("mongoose");

/**
 * Defines the schema for a code collaboration room.
 * Each room is uniquely identified by its `title`.
 * The model is stored in the "tasks" collection in MongoDB.
 */
const roomSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },

  description: { type: String, required: true },

  baseCode: { type: String, required: true },

  referenceCode: { type: String, required: true },

  createdBy: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

// The third parameter ("tasks") enforces the collection name explicitly
const Room = mongoose.model("Room", roomSchema, "tasks");

module.exports = Room;
