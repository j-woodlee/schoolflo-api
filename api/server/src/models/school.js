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

        School.hasMany(models.Student, {
            foreignKey: "school_id",
            as: "students"
        });

        School.hasMany(models.FormGroup, {
            foreignKey: "school_id",
            as: "formgroups"
        });

        School.hasMany(models.Class, {
            foreignKey: "school_id",
            as: "classes"
        });
    };
    return School;
};
