"use strict";
module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define("Class", {
        name: DataTypes.STRING,
        section: DataTypes.STRING,
        teacher: DataTypes.INTEGER,
        school_id: DataTypes.INTEGER,
        students: DataTypes.ARRAY(DataTypes.INTEGER)
    }, {});
    Class.associate = function(models) {
    // associations can be defined here
        Class.belongsTo(models.School, {
            foreignKey: "school_id",
            as: "school"
        });
    };
    return Class;
};
