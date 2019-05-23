const pool = require('../../databasePool');
const DragonTable = require('./table');
const Dragon = require('./index');

const getDragonWithTraits = ({ dragonId }) => {
    return Promise.all([
        DragonTable.getDragon({dragonId}),
        new Promise((resolve, reject) => {
            pool.query(
                `SELECT "traitType","traitValue" 
                FROM trait 
                INNER JOIN dragontrait ON trait.id = dragontrait."traitId"
                WHERE dragontrait."dragonId" =$1; `,
                [dragonId],
                (error, response) => {
                    if(error) return reject(error);
                    resolve(response.rows);
                }
            );
        })
    ])
    .then(([dragon, dragonTraits])=> {
        /*dragon.dragonId = dragonId;
        dragon.dragonTraits = dragonTraits;

        return dragon;*/

        return new Dragon({... dragon, dragonId, traits: dragonTraits});
    })
    .catch(error => console.error(error));
};

getDragonWithTraits({dragonId: 1})
.then(dragon => console.log(dragon))
.catch(error => console.error(error));
module.exports = { getDragonWithTraits };
