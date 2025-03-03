import express from "express"; // Import express
import ratingController from "../controllers/ratingController.js"; // Ensure to add .js extension

import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js"; // Ensure to add .js extension
import { ratingSchema } from "../../schemas/index.js"; // Ensure to add .js extension
import { validateSchema } from "../../utils/validator.js"; // Ensure to add .js extension

const router = express.Router();

// Add a rating (Only Students)
router.post("/", authMiddleware, roleMiddleware(["student"]), ratingController.addRating);

// Get all ratings for a course (Public)
router.get("/:courseId", ratingController.getRatings);

// Update a rating (Only the user who rated)
router.put("/",  authMiddleware, ratingController.updateRating);

// Delete a rating (Only the user who rated or admin)
router.delete("/", authMiddleware, ratingController.deleteRating);

export default router; // Use export default for the router