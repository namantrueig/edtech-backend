import sequelize from "../../config/db.js"; 
import { Rating, Course } from "../../database/models/index.js"; 
import jwt from 'jsonwebtoken'

const getTokenFromHeader = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.split(" ")[1]; // Extract token
    }
    return null; // No token found
  };

const ratingController = {
    addRating: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { courseId,  rating, review } = req.body;

            const token = getTokenFromHeader(req);
            
              if (!token) {
                return res.status(401).json({ message: "Unauthorized, no token provided" });
              }
            
              
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded.role !== "student") {
                    return res.status(403).json({ message: "Forbidden: Only students allowed" });
                  }

            const studentId=decoded.id;

            // Check if the user has already rated the course
            const existingRating = await Rating.findOne({
                where: { courseId, studentId },
                transaction: t
            });

            if (existingRating) {
                await t.rollback();
                return res.status(400).json({ message: "User  has already rated this course" });
            }

            const newRating = await Rating.create(
                { courseId, studentId, rating, review },
                { transaction: t }
            );

            const ratingWithCourse = await Rating.findByPk(newRating.id, {
                include: [
                    {
                        model: Course,
                        as: 'course',  // Alias defined in associations
                        attributes: ['id', 'title'], // Fetch only necessary fields
                    }
                ],
                transaction: t // Use the same transaction
            });

            await t.commit();
            res.status(201).json({ message: "Rating added successfully", rating: ratingWithCourse });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    getRatings: async (req, res) => {
        try {
            const { courseId } = req.params;

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;

            const { count, rows: ratings } = await Rating.findAndCountAll({
                where: { courseId },
                limit: limit,
                offset: offset
            });

            if (!ratings.length) {
                return res.status(404).json({ message: "No ratings available" });
            }

            const totalPages = Math.ceil(count / limit);

            res.status(200).json({
                message: "Paginated list of ratings",
                ratings,
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

    updateRating: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { courseId, rating, review } = req.body;
            const token = req.headers.authorization?.split(" ")[1]; // Extract token after 'Bearer '
            if (!token) return res.status(403).json({ message: "Unauthorized: No token provided" });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.userId; // Attach `userId` to `req`
            
          const studentId=userId;
            const existingRating = await Rating.findOne({
                where: { courseId ,studentId},
                transaction: t
            });

            if (!existingRating) {
                await t.rollback();
                return res.status(404).json({ message: "Rating not found" });
            }

            await existingRating.update({ rating, review }, { transaction: t });

            await t.commit();
            res.status(200).json({ message: "Rating updated successfully", rating: existingRating });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    },

    deleteRating: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const { courseId, studentId } = req.body;

            const rating = await Rating.findOne({ where: { courseId, studentId }, transaction: t });

            if (!rating) {
                await t.rollback();
                return res.status(404).json({ message: "Rating not found" });
            }

            await rating.destroy({ transaction: t });

            await t.commit();
            res.status(200).json({ message: "Rating deleted successfully" });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).json({ message: "Server error", error });
        }
    }
};

export default ratingController; // Use export default for the ratingController