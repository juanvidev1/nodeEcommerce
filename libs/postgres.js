require('dotenv').config();
const { Client } = require('pg');

const getConection = async () => {
    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: 'juanvidev',
        password: 'Admin123',
        database: 'my_store'
    });
    await client.connect();
    return client;
}

module.exports = getConection;
