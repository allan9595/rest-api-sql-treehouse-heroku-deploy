"use strict";
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class User extends Sequelize.Model {}
    User.init({
        // attributes
        id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        firstName: {
        type: Sequelize.STRING,
        allowNull: false
        },
        lastName: {
        type: Sequelize.STRING
        // allowNull defaults to true
        },
        emailAddress: {
        type: Sequelize.STRING,
        },
        password: {
        type: Sequelize.STRING,
        }
    }, {
        sequelize,
        modelName: 'user'
        // options
    });

    User.association = () => {
        User.hasMany(models.Course);
    }

    return User;
}
