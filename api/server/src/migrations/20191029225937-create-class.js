"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Classes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            section: {
                type: Sequelize.STRING
            },
            teacher: {
                type: Sequelize.INTEGER
            },
            school: {
                type: Sequelize.INTEGER
            },
            students: {
                type: Sequelize.ARRAY(Sequelize.INTEGER)
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
        return queryInterface.dropTable("Classes");
    }
};
