const {sequelize} = require('../config/db');
const User = require('./User');
const courseCategory = require('./courseCategory');
const Course = require('./Course');
const Rating = require('./Rating');


// Associations
User.hasMany(Course, { foreignKey: 'instructorId', scope: { role: 'instructor' } });
Course.belongsTo(User, { foreignKey: 'instructorId', as: 'Instructor' });

courseCategory.hasMany(Course, { foreignKey: 'categoryId' });
Course.belongsTo(courseCategory, { foreignKey: 'categoryId' });

User.hasMany(Rating, { foreignKey: 'studentId', scope: { role: 'student' } });
Course.hasMany(Rating, { foreignKey: 'courseId' });
Rating.belongsTo(User, { foreignKey: 'studentId', as: 'Student' });
Rating.belongsTo(Course, { foreignKey: 'courseId' });



module.exports = { sequelize, User, courseCategory, Course, Rating };
