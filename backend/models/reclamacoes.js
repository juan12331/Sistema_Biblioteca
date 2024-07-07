const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime');
const usuarios = require('./usuarios')

const reclamacoes = database.define('reclamacoes', {
    
    cpf_usuario: {
        type: Sequelize.STRING,
        AllowNUll: false,
        primaryKey: true,
        references: {
            model: usuarios,
            key: 'cpf'
        }
    },
    reclamacao: {
        type: Sequelize.STRING(500),
    },
});


usuarios.hasmany(reclamacoes, {
    foreignKey: 'id_autor'
})

reclamacoes.belongsTo(usuarios);


module.exports = reclamacoes