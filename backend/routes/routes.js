const express = require('express')
const routes = express.Router();
const UsuariosControllers = require('../controllers/usuarios')

routes.get('/usuarios', UsuariosControllers.getUsers)
routes.get('/usuarios/:cpf', UsuariosControllers.getUsersByCpf)

routes.post('/login', UsuariosControllers.login)

routes.post('/usuarios', UsuariosControllers.createUsuario)
routes.delete('/usuarios/:cpf', UsuariosControllers.deleteUsuario)

module.exports = routes