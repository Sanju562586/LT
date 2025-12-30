// models/Problem.js
const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    name: String,
    link: String,
    date: Date,
    difficulty: Number,
    completed: { type: Boolean, default: false },
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
