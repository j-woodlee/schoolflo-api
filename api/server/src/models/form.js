"use strict";
module.exports = (sequelize, DataTypes) => {
    const Form = sequelize.define("Form", {
        student_id: DataTypes.INTEGER,
        path: DataTypes.STRING,
        name: DataTypes.STRING,
        class_id: DataTypes.INTEGER
    }, {});
    Form.associate = function(models) {
    // associations can be defined here
        Form.belongsTo(models.Student, {
            foreignKey: "student_id",
            as: "student"
        });
    };
    return Form;
};
