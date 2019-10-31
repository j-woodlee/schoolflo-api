"use strict";
module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("Student", {
        name: DataTypes.STRING,
        guardian_email: DataTypes.STRING,
        student_id: DataTypes.STRING,
        school_id: DataTypes.INTEGER
    }, {});
    Student.associate = function(models) {
    // associations can be defined here
        Student.belongsTo(models.School, {
            foreignKey: "school_id",
            as: "school"
        });
    };
    return Student;
};
