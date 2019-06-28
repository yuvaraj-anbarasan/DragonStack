const { Router } = require('express');
const AccountsTable = require('../accounts/table');

router = new Router();

router.post('/signup',(req, res, next) => {
    const {username, password} = req.body;
     AccountsTable.storeAccount({username, password})
     .then(() => res.json({message: 'success'}))
     .catch(error => next(error));
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