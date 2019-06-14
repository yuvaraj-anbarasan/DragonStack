const pool = require('../../database/databasePool');

class AccountsTable{
    static storeAccount({username, password}) {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO accounts(username, password) VALUES($1, $2);',
                [username,password],
                (error, response) => {
                    if(error)
                    {
                        return reject(error);
                    }
                    resolve();  
                }
            );
        });
    }
}

module.exports = AccountsTable;