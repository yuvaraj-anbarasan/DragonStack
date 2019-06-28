const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const accountRouter = require('./api/accounts.js');
const GenerationEngine = require('./generation/engine');
const dragonRouter = require('./api/dragon.js');
const generationRouter = require('./api/generation.js');

const app = express();
const engine = new GenerationEngine();

app.locals.engine=engine; // setting the locals to pass the engine object used by api/dragon.js

app.use( cors({ origin: 'http://localhost:1234'}));

app.use(bodyParser.json()); // used for accounts post request.
app.use(cookieParser());

app.use('/account', accountRouter);
app.use('/dragon', dragonRouter);
app.use('/generation',generationRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        type: 'error', message: err.message
    });
});
engine.start();



module.exports = app;