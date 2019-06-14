const { Router } = require('express');
const AccountsTable = require('../accounts/table');

router = new Router();

router.post('/signup',(req, res, next) => {
    const {username, password} = req.body;
     AccountsTable.storeAccount({username, password})
     .then(() => res.json({message: 'success'}))
     .catch(error => next(error));
});

module.exports = router;