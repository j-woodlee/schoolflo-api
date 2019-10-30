"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Teachers", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING
            },
            password_hash: {
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
        return queryInterface.dropTable("Teachers");
    }
};
