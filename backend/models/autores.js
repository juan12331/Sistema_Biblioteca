const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime');

const autores = database.define('usuarios', {
    autor: {
        type: Sequelize.STRING,
        AllowNUll: false,
        primaryKey: true
    },
});


module.exports = autores