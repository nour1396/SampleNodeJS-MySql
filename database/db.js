const mySql = require('mysql2');


const Query = mySql.connect({
    host: 'localhost',
    database: 'routeDB',
    user: 'root',
    password: ''
});

module.exports = Query.promise();