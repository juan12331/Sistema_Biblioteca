const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime');
const autores = require('./autores')

const livros = database.define('livros', {

    id_livro: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
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
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_autor: {
        type: Sequelize.INTEGER,
        AllowNUll: false,
        references: 'autores', // referencia o nome da tabela
        referenceskey: 'id_autor', // aqui vai a primarykey
    }
});

autores.hasMany(livros)

module.exports = livros