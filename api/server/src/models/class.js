"use strict";
module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define("Class", {
        name: DataTypes.STRING,
        section: DataTypes.STRING,
        teacher: DataTypes.INTEGER,
        students: DataTypes.ARRAY(DataTypes.INTEGER)
    }, {});
    Class.associate = function(models) {
    // associations can be defined here
    };
    return Class;
};
