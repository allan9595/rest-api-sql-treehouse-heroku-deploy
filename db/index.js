"use strict";
const fs = require('fs');
const path = require('path');
const config = require('../config');

const Sequelize = require('sequelize');
const { database, username, password } = config.db;
const sequelize = new Sequelize(
  database, username, password, {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    database: process.env.DB_NAME || 'database',
    username: process.env.DB_USERNAME || 'username',
    password: process.env.DB_PASSWORD || 'password'
  }
);

const models = {};


// Import all of the models.
fs
  .readdirSync(path.join(__dirname, 'models'))
  .forEach((file) => {
    console.info(`Importing database model from file: ${file}`);
    const model = sequelize.import(path.join(__dirname, 'models', file));
    models[model.name] = model;
  });

// If available, call method to create associations.
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    console.info(`Configuring the associations for the ${modelName} model...`);
    models[modelName].associate(models);
  }
});


//module.exports = db;
module.exports = {
  sequelize,
  Sequelize,
  models,
};
