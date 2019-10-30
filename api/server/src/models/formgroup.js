/**
  This file defines the FormGroup table in the database.
  Ex. all forms signed for the "02/31 Field Trip" would be in the same
  FormGroup.
**/

"use strict";
module.exports = (sequelize, DataTypes) => {
    const FormGroup = sequelize.define("FormGroup", {
        name: DataTypes.STRING,
        path: DataTypes.STRING
    }, {});
    FormGroup.associate = function(models) {
    // associations can be defined here
    };
    return FormGroup;
};
