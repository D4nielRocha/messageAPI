let sql = require('mssql');

const dbConfig = require('../config/db_config.json');


let dbConnect = new sql.ConnectionPool(dbConfig.connection)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL DB')
        return pool
    })
    .catch(err => console.log('Database connection failed - error' + err));

module.exports = {
    sql, dbConnect
};