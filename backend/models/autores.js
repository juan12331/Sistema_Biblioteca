const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime');

const autores = database.define('autores', {
    id_autor: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        AllowNUll: false,
        primaryKey: true
    },
    
    autor: {
        type: Sequelize.STRING,
        AllowNUll: false,
    }
});


module.exports = autores