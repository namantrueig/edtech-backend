import express from "express";
import dotenv from "dotenv";

import authRoutes from "./rest-resources/routes/authRoutes.js";
import courseRoutes from "./rest-resources/routes/courseRoutes.js";
import categoryRoutes from "./rest-resources/routes/categoryRoutes.js";
import ratingRoutes from "./rest-resources/routes/ratingRoutes.js";
import userRoutes from "./rest-resources/routes/userRoutes.js";

dotenv.config(); // Load environment variables

const app = express();

app.use(express.json()); // Middleware to parse JSON

// Authentication Routes
app.use("/api/auth", authRoutes);

// Course Routes
app.use("/api/courses", courseRoutes);

// Category Routes
app.use("/api/categories", categoryRoutes);

// Rating Routes
app.use("/api/ratings", ratingRoutes);

// User Routes
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 2000;
app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
