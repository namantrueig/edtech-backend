const express = require("express");
// const  {User,Rating,Course,courseCategory}  = require("./models");

const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const userRoutes = require("./routes/userRoutes");


const sequelize=require("./config/db");




const app = express();

app.use(express.json()); // Middleware to parse JSON

// Authentication Routes
app.use("/api/auth", authRoutes);

// Course Routes
app.use("/api/courses", courseRoutes);


// Category Routes
app.use("/api/categories", categoryRoutes);

app.use("/api/ratings", ratingRoutes);

app.use("/api/users", userRoutes);



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
