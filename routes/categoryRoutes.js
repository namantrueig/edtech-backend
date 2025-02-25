const express = require("express");
const {
    createCategory,
    getCategory,
    // getCategoryById,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create a category (Only Admins)
router.post("/", authMiddleware, roleMiddleware(["admin"]), createCategory);

// Get all categories (Public)
router.get("/", getCategory);

// Get a single category by ID (Public)
// router.get("/:id", getCategoryById);

// Update a category (Only Admins)
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateCategory);

// Delete a category (Only Admins)
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteCategory);

module.exports = router;
