"use strict";

var express = require("express");
// const  {User,Rating,Course,courseCategory}  = require("./models");

var dotenv = require("dotenv");
var authRoutes = require("./routes/authRoutes");
var courseRoutes = require("./routes/courseRoutes");
var categoryRoutes = require("./routes/categoryRoutes");
var ratingRoutes = require("./routes/ratingRoutes");
var userRoutes = require("./routes/userRoutes");
var sequelize = require("./config/db");
var app = express();
app.use(express.json()); // Middleware to parse JSON

// Authentication Routes
app.use("/api/auth", authRoutes);

// Course Routes
app.use("/api/courses", courseRoutes);

// Category Routes
app.use("/api/categories", categoryRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/users", userRoutes);
app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
