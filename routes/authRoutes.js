const express = require("express");
const { signup, login } = require("../controllers/authController");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Example Protected Route (Only Admins Can Access)
router.get("/admin", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
    res.json({ message: "Welcome Admin!" });
});

// Example Protected Route (Only Instructors Can Access)
router.get("/instructor", authMiddleware, roleMiddleware(["instructor"]), (req, res) => {
    res.json({ message: "Welcome Instructor!" });
});

module.exports = router;
