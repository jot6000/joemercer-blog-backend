const Pool = require('pg').Pool

/*const connection = new Pool({
    user: 'joeme',
    host: 'localhost',
    database: 'joemercerblog',
    password: '********',
    port: 5432,
})*/

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

module.exports = {
    connection
}