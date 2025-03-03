import express from "express"; // Import express
import categoryController from "../controllers/categoryController.js"; // Ensure to add .js extension
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js"; // Ensure to add .js extension
import { categorySchema } from "../../schemas/index.js"; // Ensure to add .js extension
import { validateSchema } from "../../utils/validator.js"; // Ensure to add .js extension

const router = express.Router();

// Create a category (Only Admins)
router.post("/",  authMiddleware, roleMiddleware(["admin"]), categoryController.createCategory);

// Get all categories (Public)
router.get("/", categoryController.getCategory);

// Get a single category by ID (Public)
// router.get("/:id", getCategoryById);

// Update a category (Only Admins)
router.put("/:id",  authMiddleware, roleMiddleware(["admin"]), categoryController.updateCategory);

// Delete a category (Only Admins)
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), categoryController.deleteCategory);

export default router; // Use export default for the router