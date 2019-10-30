"use strict";
module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("Student", {
        name: DataTypes.STRING,
        guardian_email: DataTypes.STRING,
        student_id: DataTypes.STRING,
        school: DataTypes.INTEGER
    }, {});
    Student.associate = function(models) {
    // associations can be defined here
    };
    return Student;
};
