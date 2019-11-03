"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("FormGroups", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            path: {
                type: Sequelize.STRING
            },
            school_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Schools",
                    key: "id"
                }
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
        return queryInterface.dropTable("FormGroups");
    }
};
