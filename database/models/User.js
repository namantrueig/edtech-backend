import { DataTypes } from 'sequelize';
import Course from './Course.js'; // Ensure to add .js extension
import sequelize from '../../config/db.js'; // Ensure to add .js extension

const User = sequelize.define('User ', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { 
        type: DataTypes.ENUM('admin', 'student', 'instructor'), 
        allowNull: false 
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Course,
            key: "id",
        },
        onDelete: 'CASCADE',
    }
}, {
    tableName: "Users",
    underscored:true,
});

export default User; // Use export default for the User model