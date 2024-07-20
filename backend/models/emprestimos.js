const Sequelize = require('sequelize')
const database = require('../config/sequelize')
const { default_type } = require('mime');
const usuarios = require('./usuarios')
const livros = require('./livros')

const emprestimos = database.define('emprestimos', {
    id_emprestimos: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        AllowNUll: false,
        primaryKey: true,
        unique: true  
    },
    id_livro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    cpf_usuario: {
        type: Sequelize.STRING,
        AllowNUll: false,
        unique: true
    },
    status: {
        type: Sequelize.ENUM('Entregue', 'Não entregue'),
        AllowNUll: false,
        defaultValue: 'Não entregue'
    }
})

usuarios.hasMany(emprestimos, {
    foreignKey: 'cpf_usuario'
})

emprestimos.belongsTo(usuarios, {
    foreignKey: 'cpf_usuario'
})

livros.hasMany(emprestimos, {
    foreignKey: 'id_livro'
})

emprestimos.belongsTo(livros, {
    foreignKey: 'id_livro'
})

module.exports = emprestimos