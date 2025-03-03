import User from "../../database/models/User.js"; // Ensure to add .js extension

const userController = {
    createUser:  async (req, res) => {
        try {
            const { name, email, password, role } = req.body;

            // Check if the user already exists
            const existingUser  = await User.findOne({ where: { email } });
            if (existingUser ) {
                return res.status(400).json({ message: "User  with this email id already exists" });
            }

            const newUser  = await User.create({ name, email, password, role });
            res.status(201).json({ message: "User  created successfully", user: newUser  });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating user' });
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ["id", "name", "email", "role", "createdAt"], // Only necessary fields
                order: [["createdAt", "DESC"]]
            });

            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching users", error });
        }
    },

    getUser:  async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "User  not found" });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    updateUser:  async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "User  not found" });
            }

            await user.update({ name, email, password });
            res.status(200).json({ message: "User  updated successfully", user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    deleteUser:  async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "User  not found" });
            }

            await user.destroy();
            res.status(200).json({ message: "User  deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }
};

export default userController; // Use export default for the userController