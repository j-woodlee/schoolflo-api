"use strict";
module.exports = (sequelize, DataTypes) => {
    const Form = sequelize.define("Form", {
        student: DataTypes.INTEGER,
        path: DataTypes.STRING,
        name: DataTypes.STRING,
        class: DataTypes.INTEGER
    }, {});
    Form.associate = function(models) {
    // associations can be defined here
    };
    return Form;
};
