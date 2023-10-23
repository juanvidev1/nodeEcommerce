const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('../db/models');
const dialect = config.dialect;
let URI;

if (dialect === 'mysql') {
    const USER = encodeURIComponent(config.mysqlUser);
    const PASSWORD = encodeURIComponent(config.dbPassword);
    URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.mysqlPort}/${config.dbName}`;
} else {
    const USER = encodeURIComponent(config.dbUser);
    const PASSWORD = encodeURIComponent(config.dbPassword);
    URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

const sequelize = new Sequelize(URI, {
    dialect: dialect,
    logging: true
});

setupModels(sequelize);

// sequelize.sync(); --> Una vez generada la migración ya no se utiliza esta pieza de código. Ya se va a hacer todo por migraciones

module.exports = sequelize;