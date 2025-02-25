const express = require("express");
const {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");

const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a course (Only Instructors & Admins)
router.post("/", authMiddleware, roleMiddleware(["instructor", "admin"]), createCourse);

// Get all courses (Public)
router.get("/:id", getCourseById);

// Get a single course by ID (Public)
router.get("/", getAllCourses);

// Update a course (Only Instructors & Admins)
router.put("/:id", authMiddleware, roleMiddleware(["instructor", "admin"]), updateCourse);

// Delete a course (Only Admins)
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteCourse);

module.exports = router;
