"use strict";
module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define("Teacher", {
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING
    }, {});
    Teacher.associate = function(models) {
    // associations can be defined here
        Teacher.belongsTo(models.School, {
            foreignKey: "school_id",
            as: "school"
        });
    };
    return Teacher;
};
