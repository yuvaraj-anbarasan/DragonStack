const {Pool} = require('pg');
const dbConfig = require('./secret/databaseConfiguration.js');

const pool = new Pool(dbConfig);

module.exports = pool;
