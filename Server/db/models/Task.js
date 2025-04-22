// db/models/Task.js

const mongoose = require('mongoose');

/**
 * Schema for standalone coding tasks that are not necessarily tied to live rooms.
 * These can be used for listing available challenges, templates, or offline exercises.
 */
const taskSchema = new mongoose.Schema({
  // Task title – must be unique to prevent duplicates
  title: {
    type: String,
    required: true,
    unique: true, 
    trim: true, // Removes leading/trailing spaces
  },

  // Full description of the task (shown to users)
  description: {
    type: String,
    required: true,
  },

  // Initial code template provided to the user
  baseCode: {
    type: String,
    required: true,
  },

  // Reference/solution code used internally (e.g., for validation or instructor view)
  referenceCode: {
    type: String,
    required: true,
  },

  // Creator name or ID (default is "tom")
  createdBy: {
    type: String,
    default: 'tom',
    // Optional: set `required: true` if you want to enforce this in all cases
  },

  // Timestamp when the task was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Creates a collection named "tasks" (automatically pluralized from 'Task')
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
