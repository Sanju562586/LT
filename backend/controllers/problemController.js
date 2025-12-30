// controllers/problemController.js
const Problem = require("../models/Problem");
const { Admin } = require("../models/Admin");

// Get all problems
const getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find().sort({ date: -1 });
        res.json(problems);
    } catch (err) {
        console.error("Error fetching problems:", err);
        res.status(500).json({ error: "Failed to fetch problems" });
    }
};

// Add a problem (requires password)
const createProblem = async (req, res) => {
    const { name, link, date, difficulty, password } = req.body;

    try {
        const admin = await Admin.findOne();
        if (!admin || password !== admin.password) {
            return res.status(403).json({ error: "Invalid password" });
        }

        const problem = new Problem({ name, link, date, difficulty });
        await problem.save();
        res.status(201).json(problem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update problem completion status (public - no password required)
const updateProblem = async (req, res) => {
    try {
        const { completed } = req.body;

        const problem = await Problem.findByIdAndUpdate(
            req.params.id,
            { completed },
            { new: true }
        );
        res.json(problem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a problem (requires password)
const deleteProblem = async (req, res) => {
    try {
        const { password } = req.body;
        const admin = await Admin.findOne();
        if (!admin || password !== admin.password) {
            return res.status(403).json({ error: "Invalid password" });
        }
        await Problem.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getAllProblems,
    createProblem,
    updateProblem,
    deleteProblem
};
