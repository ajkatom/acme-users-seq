/******************************************
 *  Author : Author   
 *  Created On : Fri Feb 02 2018
 *  File : server.js
 *******************************************/
const db = require('./db');
const express = require('express');
const app = express();
const path = require('path');
const User = db.models.User;
app.use(require('method-override')('_method'));
app.use(require('body-parser').urlencoded());
const nunjucks = require('nunjucks');
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure({ noCache: true });
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use((req, res, next) => {
    res.locals.path = req.url;
    next();
});


app.use('/users', require('./routes/users'));
app.use('/error', require('./routes/error'));

port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
app.get('/', (req, res, next) => {
    res.render('index', { title: 'home' });
});



db.sync()
    .then(() => {
        db.seed()
        console.log('synced & seeded')
    });