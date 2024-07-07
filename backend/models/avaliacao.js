const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime');

const avaliacao = database.define('avaliacao', {
    
    cpf_usuario: {
        type: Sequelize.STRING,
        AllowNUll: false,
        primaryKey: true
    },
    id_livro: {
        type: Sequelize.BIGINT,  
        allowNull: false,
    }
});

module.exports = avaliacao