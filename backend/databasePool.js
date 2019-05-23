const {Pool} = require('pg');
const dbConfig = require('./secrets/databaseConfiguration.js');

const pool = new Pool(dbConfig);

module.exports = pool;
