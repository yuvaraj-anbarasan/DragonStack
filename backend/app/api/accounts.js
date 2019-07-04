const { Router } = require('express');
const AccountsTable = require('../accounts/table');
const { hash } = require('../accounts/secure');
const Session = require('../accounts/session');
const { setSession } = require('./secure');

router = new Router();

router.post('/signup',(req, res, next) => {
    const {username, password} = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);
    AccountsTable.getAccount({ usernameHash })
    .then(({ account }) => {
        if(!account){
            return AccountsTable.storeAccount({usernameHash, passwordHash});
        }
        else{
            const error = new Error('Account already exist');

            error.statusCode = 409;

            throw error;
        }
    })
    .then(() => {
        /*as set session methosd is asynchronous we cannot give the client a success message before the method gets executed.
        Therefore the setSession method uses a promise*/
        setSession({ username, res})
        .then(({ message }) => res.json(message))
        .catch( error => res.json({message:"cookie not set"}));
    })
    .catch( error => next(error));
     
});

router.post('/login',(req, res, next) => {
    const { username, password } = req.body;

    AccountsTable.getAccount({ usernameHash: hash(username) })
    .then(({ account }) => {
        if( account && account.password === hash(password)){
            const { sessionId } = account;

            return setSession({ username, res, sessionId })
        }
        else{
            const error = new Error('Invalid username/ password');
            error.statusCode = 409;
            throw error;
        }
    })
    .then(({ message }) => res.json(message))
    .catch(error => next(error));
});

router.get('/logout', (req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionString);

    AccountsTable.updateSessionId({
        sessionId: null,
        usernameHash: hash( username )
    })
    .then(() => {
        res.clearCookie('sessionString');
        res.json({message:"successfully logout"});
    })
    .catch( error => next(error));
});

module.exports = router;