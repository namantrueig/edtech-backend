const sequelize  = require("../config/db");

const { Rating, Course } = require("../models");


const ratingController = {
    
    addRating: async (req, res) => {
      const t = await sequelize.transaction();
      try {
          const { courseId, studentId, rating, review } = req.body;

          // Check if the user has already rated the course
          const existingRating = await Rating.findOne({
              where: { courseId, studentId },
              transaction: t
          });

          if (existingRating) {
              await t.rollback();
              return res.status(400).json({ message: "User has already rated this course" });
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
          res.status(201).json({ message: "Rating added successfully", rating: newRating });
      } catch (error) {
          await t.rollback();
          console.error(error);
          res.status(500).json({ message: "Server error", error });
      }
    },
    getRatings: async (req, res) => {
      try {
        const { courseId } = req.params;

        const page=parseInt(req.query.page)||1;
        const limit=parseInt(req.query.limit)||10;
        const offset=(page-1)*limit;

        const {count, rows:ratings}= await Rating.findAndCountAll({
            where:{courseId},
            limit:limit,
            offset:offset
        });

        if(!ratings.length){
            return res.status(404).json({message:"No ratings availavle"});
        }

        const totalPages=Math.ceil(count/limit);

        res.status(200).json({
            message:"Paginated list of ratings",
            ratings,
            pagination:{
                totalItems:count,
                totalPages:totalPages,
                currentPage:page,
                ItemsPerPage:limit
            }
        })
       
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
    },
    updateRating: async (req, res) => {
      const t = await sequelize.transaction();
      try {
          
          const { courseId,rating, review ,studentId} = req.body;
         console.log("course id  ",courseId)

          const existingRating = await Rating.findOne({
              where: { courseId, studentId },
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
  
  module.exports = ratingController;
