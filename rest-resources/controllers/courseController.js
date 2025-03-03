import sequelize from "../../config/db.js"; // Ensure to add .js extension
import { Course, courseCategory, User } from "../../database/models/index.js"; // Ensure to add .js extension
import jwt from "jsonwebtoken";


const getTokenFromHeader = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.split(" ")[1]; // Extract token
    }
    return null; // No token found
  };

const courseController = {

    createCourse: async (req, res) => {
        const t = await sequelize.transaction(); // Start a transaction
        try {
            const { title, description, price, categoryId } = req.body;
            
             const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user is an instructor
    // if (decoded.role !== "instructor") {
    //   return res.status(403).json({ message: "Forbidden: Only instructors allowed" });
    // }

  const  instructorId = decoded.id;
    console.log("instructor id-",instructorId);
               
            const newCourse = await Course.create(
                { title, description, price, instructorId, categoryId },
                { transaction: t } // Pass the transaction
            );

            await t.commit(); // Commit transaction if everything is successful
            res.status(201).json({ message: "Course created successfully", course: newCourse });
        } catch (error) {
            await t.rollback(); // Rollback transaction in case of error
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    getAllCourses: async (req, res) => {
        try {
            // Extract query parameters for pagination
            const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
            const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified
            const offset = (page - 1) * limit; // Calculate the offset
            console.log("hellllooo"
            );
            // Fetch courses with pagination
            const { count, rows: courses } = await Course.findAndCountAll({
                limit: limit,
                offset: offset
            });
            console.log(courses);

            // Calculate total pages
            const totalPages = Math.ceil(count / limit);

            // Return the paginated results along with pagination metadata
            res.status(200).json({
                message: "Paginated list of courses",
                courses,
                pagination: {
                    totalItems: count,
                    totalPages: totalPages,
                    currentPage: page,
                    itemsPerPage: limit
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    },

    getCourseById: async (req, res) => {
        try {
            const { id } = req.params;
            const course = await Course.findByPk(id, {
                include: [
                    {
                        model: courseCategory,  // Assuming 'courseCategory' is the related model
                        as: 'category',   // Alias if defined in associations
                        attributes: ['name'],
                    },
                    {
                        model: User, 
                        as: 'Instructor',  // Alias if defined
                        attributes: ['name', 'email'], // Fetch only specific columns
                    }
                ]
            });

            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }

            res.status(200).json(course);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    updateCourse: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;
            const { title, description, price, instructorId, categoryId } = req.body;

            const course = await Course.findByPk(id, { transaction: t });

            if (!course) {
                await t.rollback();
                return res.status(404).json({ message: "Course not found" });
            }

            await course.update(
                { title, description, price, instructorId, categoryId },
                { transaction: t }
            );

            await t.commit();
            res.status(200).json({ message: "Course updated successfully", course });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    deleteCourse: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { id } = req.params;
            const course = await Course.findByPk(id, { transaction: t });

            if (!course) {
                await t.rollback();
                return res.status(404).json({ message: "Course not found" });
            }

            await course.destroy({ transaction: t });

            await t.commit();
            res.status(200).json({ message: "Course deleted successfully" });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }
};

export default courseController; // Use export default for the courseController