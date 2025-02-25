const sequelize  = require("../config/db");
const { User } = require("../models");


const Category=require("../models/courseCategory")



const categoryController = {
  createCategory: async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { name, description } = req.body;
        
        // Check if the category already exists
        const existingCategory = await Category.findOne({ where: { name }, transaction: t });

        if (existingCategory) {
            await t.rollback();
            return res.status(400).json({ message: "Category already exists" });
        }

        const newCategory = await Category.create(
            { name, description },
            { transaction: t }
        );

        await t.commit();
        res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
},

// Get category by ID
getCategory: async (req, res) => {
    try {
        // Extract query parameters for pagination
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified
        const offset = (page - 1) * limit; // Calculate the offset

        // Fetch categories with pagination
        const { count, rows: categories } = await Category.findAndCountAll({
            limit: limit,
            offset: offset
        });

        // Calculate total pages
        const totalPages = Math.ceil(count / limit);

        // Return the paginated results along with pagination metadata
        return res.status(200).json({
            categories,
            pagination: {
                totalItems: count,
                totalPages: totalPages,
                currentPage: page,
                itemsPerPage: limit
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
},

// Update category details with a transaction
updateCategory: async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const category = await Category.findByPk(id, { transaction: t });

        if (!category) {
            await t.rollback();
            return res.status(404).json({ message: "Category not found" });
        }

        await category.update({ name, description }, { transaction: t });

        await t.commit();
        res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
},

// Delete category by ID with a transaction
deleteCategory: async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id, { transaction: t });

        if (!category) {
            await t.rollback();
            return res.status(404).json({ message: "Category not found" });
        }

        await category.destroy({ transaction: t });

        await t.commit();
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        await t.rollback();
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
}
  };
  
  module.exports = categoryController;