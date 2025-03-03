import express from "express"; // Import express
import courseController from "../controllers/courseController.js"; // Ensure to add .js extension

import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js"; // Ensure to add .js extension
import { courseSchema } from "../../schemas/index.js"; // Ensure to add .js extension
import { validateSchema } from "../../utils/validator.js"; // Ensure to add .js extension

const router = express.Router();

// Create a course (Only Instructors & Admins)
router.post("/",  authMiddleware, roleMiddleware(["instructor", "admin"]), courseController.createCourse);

// Get a single course by ID (Public)
router.get("/:id", courseController.getCourseById);

// Get all courses (Public)
router.get("/", courseController.getAllCourses);

// Update a course (Only Instructors & Admins)
router.put("/:id", authMiddleware, roleMiddleware(["instructor", "admin"]), courseController.updateCourse);

// Delete a course (Only Admins)
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), courseController.deleteCourse);

export default router; // Use export default for the router