const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime');
const usuarios = require('./usuarios')
const livros = require('./livros')

const emprestimos = database.define('emprestimos', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        AllowNUll: false,
        primaryKey: true,
        unique: true  
    },
    cpf: {
        type: Sequelize.STRING,
        AllowNUll: false,
    },
    id_livro: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('Entregue', 'Não entregue'),
        AllowNUll: false,
        defaultValue: 'Não entregue'
    }
})



usuarios.belongsToMany(livros, {
    through: emprestimos,
    foreignKey: 'cpf'
})


livros.belongsToMany(usuarios, {
    through: emprestimos,
    foreignKey: 'id_livro'
})

module.exports = emprestimos