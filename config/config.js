require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    dbUser: process.env.DB_USER_NAME,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST_NAME,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT
}

module.exports = { config };