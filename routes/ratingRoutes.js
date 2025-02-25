const express = require("express");
const {
    addRating,
    getRatings,
    updateRating,
    deleteRating
} = require("../controllers/ratingController");

const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// Add a rating (Only Students)
router.post("/", authMiddleware, roleMiddleware(["student"]), addRating);

// Get all ratings for a course (Public)
router.get("/:courseId", getRatings);

// Update a rating (Only the user who rated)
router.put("/", authMiddleware, updateRating);

// Delete a rating (Only the user who rated or admin)
router.delete("/", authMiddleware, deleteRating);

module.exports = router;
