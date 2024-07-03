const express = require('express')
const routes = express.Router();
const UsuariosControllers = require('../controllers/usuarios')

routes.get('/usuarios', UsuariosControllers.getUsers)
routes.get('/usuarios', UsuariosControllers.getUsersByCpf)

routes.post('/login', UsuariosControllers.login)

routes.post('/usuarios', UsuariosControllers.createUsuario)

module.exports = routes