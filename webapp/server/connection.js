var dbURL = process.env.DATABASE_URL; 

var pgp = require('pg-promise')();
var db = pgp(dbURL)

module.exports = db;