const express = require("express");
const connectDB = require("../src/config/db");
const tasksRouter = require("../src/routes/tasks");

const app = express();

app.use(express.json());
app.use("/api/tasks", tasksRouter);

// Export như 1 handler
module.exports = app;
