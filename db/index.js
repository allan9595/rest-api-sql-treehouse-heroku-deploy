"use strict";
const fs = require('fs');
const path = require('path');

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'fsjstd-restapi.db'
});

const db = {
    sequelize,
    Sequelize,
    models:{
        
    }
}

const models = {};
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

db.models.Course = require('./models/course.js')(sequelize);
db.models.User = require('./models/user.js')(sequelize);



module.exports = db;