import sequelize  from '../../config/db.js'; // Ensure to add .js extension
import User from './User.js'; // Ensure to add .js extension
import courseCategory from './courseCategory.js'; // Ensure to add .js extension
import Course from './Course.js'; // Ensure to add .js extension
import Rating from './Rating.js'; // Ensure to add .js extension

// Associations
User .hasMany(Course, { foreignKey: 'instructorId', scope: { role: 'instructor' } });
Course.belongsTo(User, { foreignKey: 'instructorId', as: 'Instructor' });

courseCategory.hasMany(Course, { foreignKey: 'categoryId' });
Course.belongsTo(courseCategory, { foreignKey: 'categoryId', as: 'category' });

User .hasMany(Rating, { foreignKey: 'studentId', scope: { role: 'student' } });
Course.hasMany(Rating, { foreignKey: 'courseId' });
Rating.belongsTo(User, { foreignKey: 'studentId', as: 'Student' });
Rating.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

// Exporting the models
export { sequelize, User, courseCategory, Course, Rating };