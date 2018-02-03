const express = require('express');
const nunjucks = require('nunjucks')
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = sequelize.define('user', {
    name: Sequelize.STRING
});


const sync = () => {
    return sequelize.sync({ force: true })
};

const seed = () => {
    return Promise.all([
        User.create({ name: 'abba' }),
        User.create({ name: 'jay' }),
        User.create({ name: 'jack' })


    ]);

};



module.exports = {
    sync,
    seed,
    models: {
        User
    }
};