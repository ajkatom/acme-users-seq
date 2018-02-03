const db = require('../db');
const app = require('express').Router();
const { models } = db;
const { User } = models;


app.get('/', (req, res, next) => {
    User.findAll()
        .then(users => res.render('users', { users }))
        .catch(err => next(err));
});
app.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => res.render('../views/user', { user }))
        .catch(() => res.redirect('/error'));
});
app.delete('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => user.destroy())
        .then(() => res.redirect('/users'))
        .catch(() => res.redirect('/error'));
});
app.post('/', (req, res, next) => {
    User.create(req.body)
        .then((user => res.redirect('/users')))
        .catch(() => res.redirect('/error'));
});
app.patch('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            user.name = req.body.name;
            return user.save();
        })
        .then(() => res.redirect('/users'))
        .catch(() => res.redirect('/error'));
});


module.exports = app;