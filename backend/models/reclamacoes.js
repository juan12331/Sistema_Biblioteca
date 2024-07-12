const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime');
const usuarios = require('./usuarios')

const reclamacoes = database.define('reclamacoes', {
    id_reclamacoes: {
        type: Sequelize.INTEGER,
        AllowNUll: false,
        primaryKey: true,
        autoIncrement: true,
    },
    assunto: {
        type: Sequelize.STRING,
    },
    reclamacao: {
        type: Sequelize.STRING(500),
    },
});


module.exports = reclamacoes