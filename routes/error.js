const app = require('express').Router();

app.get('/', (req, res, next) => {
    res.status(400);
    res.render('error', { title: '404: File Not Found' });
});

module.exports = app;