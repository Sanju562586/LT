// routes/problemRoutes.js
const express = require("express");
const router = express.Router();
const {
    getAllProblems,
    createProblem,
    updateProblem,
    deleteProblem
} = require("../controllers/problemController");

// GET all problems
router.get("/", getAllProblems);

// POST create a problem
router.post("/", createProblem);

// PATCH update problem
router.patch("/:id", updateProblem);

// DELETE a problem
router.delete("/:id", deleteProblem);

module.exports = router;
