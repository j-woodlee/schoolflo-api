"use strict";

import bcrypt from "bcryptjs";

console.log("bcrypt: ");
console.log(bcrypt);

module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define("Teacher", {
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING,
        school_id: DataTypes.INTEGER
    }, {});
    Teacher.associate = function(models) {
    // associations can be defined here
        Teacher.belongsTo(models.School, {
            foreignKey: "school_id",
            as: "school"
        });
    };

    Teacher.prototype.comparePassword = (passw, cb) => {
        bcrypt.compare(passw, this.password_hash, (err, isMatch) => {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    };

    return Teacher;
};
