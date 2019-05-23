const { Router } = require('express');
const dragonTable = require('../dragon/table');

const router = new Router();

router.get('/new',(req, res, next) => {
     const dragon = req.app.locals.engine.generation.newDragon();

     dragonTable.storeDragon(dragon).
     then(({ dragonId }) => {
        console.log('dragonId',dragonId);

        dragon.dragonId = dragonId;
        res.json({dragon});
     }).catch(error => next(error) );
}); 

module.exports = router;