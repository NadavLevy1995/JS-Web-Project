// 📦 This script seeds the MongoDB "tasks" collection with predefined coding challenges.
// It connects to the database, clears existing tasks, and inserts a fresh set of starter tasks.

const mongoose = require('mongoose');
const Task = require('../db/models/Task');
require('dotenv').config();

const tasks = [
  {
    title: "reverse-string",
    description: "Write a function that reverses a given string.",
    baseCode: "function reverse(str) {\n  // your code here\n}",
    referenceCode: "function reverse(str) {\n  return str.split('').reverse().join('');\n}",
    createdBy: "tom"
  },
  {
    title: "sum-two-numbers",
    description: "Write a function that returns the sum of two numbers.",
    baseCode: "function sum(a, b) {\n  // your code here\n}",
    referenceCode: "function sum(a, b) {\n  return a + b;\n}",
    createdBy: "tom"
  },
  {
    title: "factorial",
    description: "Write a function that returns the factorial of a number.",
    baseCode: "function factorial(n) {\n  // your code here\n}",
    referenceCode: "function factorial(n) {\n  return n <= 1 ? 1 : n * factorial(n - 1);\n}",
    createdBy: "tom"
  },
  {
    title: "is-palindrome",
    description: "Check if a given string is a palindrome.",
    baseCode: "function isPalindrome(str) {\n  // your code here\n}",
    referenceCode: "function isPalindrome(str) {\n  return str === str.split('').reverse().join('');\n}",
    createdBy: "tom"
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Task.deleteMany(); // מנקה את הטבלה לפני
    await Task.insertMany(tasks);
    console.log('✅ Tasks inserted successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error seeding tasks:', err.message);
  }
};

seed();
