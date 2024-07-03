const express = require('express')
const routes = express.Router();
const UsuariosControllers = require('../controllers/usuarios')


routes.post('/login', UsuariosControllers.login)

module.exports = routes