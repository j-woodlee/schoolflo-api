"use strict";
module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define("Teacher", {
        email: DataTypes.STRING,
        school: DataTypes.STRING,
        password_hash: DataTypes.STRING
    }, {});
    Teacher.associate = function(models) {
    // associations can be defined here
    };
    return Teacher;
};
