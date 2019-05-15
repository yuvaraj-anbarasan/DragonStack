const pool = require('../../databasePool');

class Dragontable{
    static storeDragon(dragon){
        const { birthdate, nickname, generationId } = dragon;

        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO dragon(birthdate, nickname, "generationId") values($1, $2, $3) RETURNING id',
            [birthdate, nickname, generationId], 
             (error, response) => {
                if(error)
                    return reject(error);

                const dragonId = response.rows[0].id;
                resolve({ dragonId });
            });
        });
    }
}

module.exports = Dragontable;