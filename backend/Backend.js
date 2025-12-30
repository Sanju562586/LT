// Backend.js - Main server entry point
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const { initializeAdmin } = require("./models/Admin");
const problemRoutes = require("./routes/problemRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
const corsOptions = {
  origin: [
    'https://lt6.netlify.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Initialize admin password after MongoDB connects
const mongoose = require("mongoose");
mongoose.connection.once("open", () => {
  initializeAdmin();
});

// Routes
app.use("/problems", problemRoutes);
app.use("/", authRoutes);

// Root route to confirm API is running
app.get("/", (req, res) => {
  res.json({ message: "LeetCode Tracker API is running" });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));