const pool = require('../../databasePool.js');

class generationTable{
    static storeGeneration(generation){
        pool.query('INSERT INTO generation(expiration) values($1)', [generation.expiration], (error, response) => {
            if(error)
                return console.error(error);
        });
    }
}

module.exports = generationTable;