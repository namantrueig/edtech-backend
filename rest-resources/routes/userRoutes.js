import express from "express"; // Import express
import userController from "../controllers/userController.js"; // Ensure to add .js extension
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js"; // Ensure to add .js extension

const router = express.Router();

// Fetch all users (Only Admin can access this)
router.get("/", authMiddleware, roleMiddleware(["admin"]), userController.getUsers); // Apply middlewares

export default router; // Use export default for the router