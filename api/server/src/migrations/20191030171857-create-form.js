"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Forms", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            student_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Students",
                    key: "id"
                }
            },
            path: {
                type: Sequelize.STRING
            },
            name: {
                type: Sequelize.STRING
            },
            class_id: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface /*Sequelize*/) => {
        return queryInterface.dropTable("Forms");
    }
};
