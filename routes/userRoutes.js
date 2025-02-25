const express = require("express");
const { getUsers } = require("../controllers/userController");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// Fetch all users (Only Admin can access this)
router.get("/",  getUsers);

module.exports = router;


// authMiddleware, roleMiddleware(["admin"]),