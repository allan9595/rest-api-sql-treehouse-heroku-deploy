"use strict";
const Sequelize = require('sequelize');
const User = require('./user.js')
module.exports = (sequelize) => {
    class Course extends Sequelize.Model {}
    Course.init({
        // attributes
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId:{
            type: Sequelize.INTEGER,
            references:{
                model: "users",
                key: 'id'
        }
        },
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        estimatedTime: {
            type: Sequelize.STRING,
            allowNull: false
        },
        materialsNeeded: {
        type: Sequelize.STRING,
        allowNull: false
        }
    }, {
        sequelize,
        modelName: 'course'
        // options
    });

    Course.association = () => {
        Course.belongsTo(models.User);
    }

    return Course;
}