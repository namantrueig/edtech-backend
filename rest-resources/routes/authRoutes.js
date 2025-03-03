import express from "express"; // Import express
import { login,signup } from '../controllers/authController.js'; // Import the authController
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware.js"; // Import middlewares
import { userSchema } from "../../schemas/index.js"; // Import user schema
import { validateSchema } from "../../utils/validator.js"; // Import validation middleware

const router = express.Router(); // Create a new router

// User signup route
router.post("/signup",  signup);

// User login route
router.post("/login", login);

// Example Protected Route (Only Admins Can Access)
router.get("/admin", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
    res.json({ message: "Welcome Admin!" });
});

// Example Protected Route (Only Instructors Can Access)
router.get("/instructor", authMiddleware, roleMiddleware(["instructor"]), (req, res) => {
    res.json({ message: "Welcome Instructor!" });
});

// Export the router
export default router;