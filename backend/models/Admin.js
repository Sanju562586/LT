// models/Admin.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: { type: String, default: "admin" },
    password: String,
});

const Admin = mongoose.model("Admin", adminSchema);

// Initialize admin password if it doesn't exist
const initializeAdmin = async () => {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            await Admin.create({
                username: "admin",
                password: process.env.ADMIN_PASSWORD
            });
            console.log("Admin password initialized");
        }
    } catch (err) {
        console.error("Error initializing admin:", err);
    }
};

module.exports = { Admin, initializeAdmin };
