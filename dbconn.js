const Pool = require('pg').Pool

const pool = new Pool ({
    user: 'issuzzoupjtwlm',
    host: 'ec2-44-205-177-160.compute-1.amazonaws.com',
    database: 'd3pum2cb6qikmt',
    password: '690eedd47d06cd915b26f7ede9d22aff880d59b7a32459c6b921b785505bd594',
    port: 5432,
    ssl: {
        rejectUnauthorized : false
    }
})

module.exports = pool