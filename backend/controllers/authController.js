// controllers/authController.js
const { Admin } = require("../models/Admin");

// Verify password
const verifyPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const admin = await Admin.findOne();

        console.log("Received password check:");
        console.log("Input:", password);
        console.log("Expected:", admin ? admin.password : "No admin found");
        console.log("Match:", admin && password === admin.password);

        if (admin && password === admin.password) {
            res.json({ success: true });
        } else {
            res.status(403).json({ error: "Invalid password" });
        }
    } catch (err) {
        console.error("Password verification error:", err);
        res.status(500).json({ error: "Verification failed" });
    }
};

module.exports = { verifyPassword };
