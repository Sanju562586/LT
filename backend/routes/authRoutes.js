// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { verifyPassword } = require("../controllers/authController");

// POST verify password
router.post("/verify-password", verifyPassword);

module.exports = router;
