const pool = require('../../databasePool');

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

    static getAccount({usernameHash}) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT uid, password, "sessionId" FROM accounts WHERE username = $1;',
            [usernameHash],
            (error, response) => {
                if(error) return reject(error);
                
                resolve({ account: response.rows[0] });
            });
        });
    }

    static updateSessionId({ sessionId, usernameHash}) {
        console.log('sessionId', sessionId);
        return new Promise((resolve, reject) => {
            pool.query('UPDATE accounts SET "sessionId" = $1 WHERE username = $2;',
            [sessionId, usernameHash],
            (error, response) => {
                if(error) return reject(error);

                resolve();
            });
        });
    }
}

module.exports = AccountsTable;