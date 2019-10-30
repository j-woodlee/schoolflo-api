"use strict";
module.exports = (sequelize, DataTypes) => {
    const School = sequelize.define("School", {
        school_district: DataTypes.STRING,
        name: DataTypes.STRING
    }, {});
    School.associate = function(models) {
    // associations can be defined here
        School.hasMany(models.Teacher, {
            foreignKey: "school_id",
            as: "teachers"
        });
    };
    return School;
};
