import User from "../../database/models/User.js"; // Ensure to add .js extension
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables


 export  const signup= async (req, res)=>  {
        try {
            const { name, email, password, role } = req.body;

            // Check if user already exists
            const existingUser  = await User.findOne({ where: { email } });
            if (existingUser ) {
                return res.status(400).json({ message: "Email already registered" });
            }

            // Hash password before storing
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser  = await User.create({
                name,
                email,
                password: hashedPassword,
                role
            });

            res.status(201).json({ message: "User  registered successfully", user: newUser  });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }

    // User Login
   export const login=async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: "User  not found" });
            }

            // Verify password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            // Generate JWT Token
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            req.user = token;
            
            const t=req.body;

            res.status(200).json({ message: "Login successful", token, t});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }
