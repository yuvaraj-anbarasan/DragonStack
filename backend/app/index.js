const express = require('express');
const GenerationEngine = require('./generation/engine');
const dragonRouter = require('./api/dragon.js');
const generationRouter = require('./api/generation.js');

const app = express();
const engine = new GenerationEngine();

app.locals.engine=engine;

app.use('/dragon', dragonRouter);
app.use('/generation',generationRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.statusCode(statusCode).json({
        type: 'error', message: err.message
    });
});
engine.start();



module.exports = app;