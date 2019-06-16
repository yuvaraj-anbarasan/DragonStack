const Session = require('../accounts/session');
const { hash } = require('../accounts/secure');
const AccountsTable = require('../accounts/table');

const setSession = ({ username, res}) => {
    return new Promise((resolve, reject) => {
        const session = new Session({ username });
        const sessionString = session.toString();

        AccountsTable.updateSessionId({
            sessionId: session.id,
            usernameHash: hash(username)
        })
        .then(() =>{ 
            
        res.cookie('sessionString', sessionString, {
            expire: Date.now() + 36000, // sessionString expires in 1 hour
            httpOnly: true, // helps to avoid client side JS to access cookies i.e cross site crypto attacks.
            //secure: true // ensures cookies are sent over secure http i.e https
        });
        resolve({message:"sessionId update successfull"});
        })
        .catch(error => res.json({message:"sessionId update unsuccessful"}));

        
    });
}

module.exports = { setSession };