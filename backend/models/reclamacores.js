const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime');

const reclamacoes = database.define('reclamacoes', {
    
    cpf_usuario: {
        type: Sequelize.STRING,
        AllowNUll: false,
        primaryKey: true
    },
    reclamacao: {
        type: Sequelize.STRING(500),
    },
    
});


module.exports = reclamacoes