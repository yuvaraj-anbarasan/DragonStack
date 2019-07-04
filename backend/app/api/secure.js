const Session = require('../accounts/session');
const { hash } = require('../accounts/secure');
const AccountsTable = require('../accounts/table');

const setSession = ({ username, res, sessionId }) => {
    return new Promise((resolve, reject) => {
        let session, sessionString;

        if( sessionId ) {
            sessionString = Session.sessionString( { username, id: sessionId});
            setSessionCookie({ sessionString, res });
            resolve({message:"session restored"});
        }else {
            console.log('sessionId',sessionId);
            session = new Session({ username });
            sessionString = session.toString();

            AccountsTable.updateSessionId({
                sessionId: session.id,
                usernameHash: hash(username)
            })
            .then(() =>{ 
            setSessionCookie({ sessionString, res });
            
            resolve({message:"sessionId update successfull"});
            })
            .catch(error => res.json({error}));
        }
    
    });
}

const setSessionCookie = ({ sessionString, res }) => {
    res.cookie('sessionString', sessionString, {
        expire: Date.now() + 36000, // sessionString expires in 1 hour
        httpOnly: true, // helps to avoid client side JS to access cookies i.e cross site crypto attacks.
        //secure: true // ensures cookies are sent over secure http i.e https
    });
}
module.exports = { setSession };