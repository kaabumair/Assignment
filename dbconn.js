const Pool = require('pg').Pool

require('dotenv').config();
const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    BASIC_TOKEN : process.env.BASIC_TOKEN,
    ssl: {
        rejectUnauthorized : false
    }
})

module.exports = pool