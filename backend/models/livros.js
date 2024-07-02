const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime');

const livros = database.define('usuarios', {
    autor: {
        type: Sequelize.STRING,
        AllowNUll: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        AllowNUll: false,
    },
    genero: {
        type: Sequelize.STRING,
        allowNull: false
    },
    data_criacao: {
        type: Sequelize.DATE,
        allowNull: false
    },
    editora: {
        type: Sequelize.STRING,
        defaultValue: "Sem editora"
    },
    qtd_disponivel: {
        type: Sequelize.NUMBER,
        allowNull: false
    }
});


module.exports = livros