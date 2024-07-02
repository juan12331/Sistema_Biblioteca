// Inicializa o sequelize
const Sequelize = require("sequelize");
const sequelize = new Sequelize('usuarios', 'root', 'root', { // parametros: database, username, password
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});
// parametros: usuario, username, senha, objeto contendo host e dialect

module.exports = sequelize;