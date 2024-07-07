const express = require('express')
const routes = express.Router();
const UsuariosControllers = require('../controllers/usuarios')
const AutoresControllers = require('../controllers/autores')
const LivrosControllers = require('../controllers/livros')
const ReclamacoesControllers = require('../controllers/reclamacoes')


//função dos usuarios

routes.get('/usuarios', UsuariosControllers.getUsers)
routes.get('/usuarios/:cpf', UsuariosControllers.getUsersByCpf)

routes.post('/login', UsuariosControllers.login)

routes.post('/usuarios', UsuariosControllers.createUsuario)
routes.delete('/usuarios/:cpf', UsuariosControllers.deleteUsuario)
routes.put('/usaurios/:cpf', UsuariosControllers.updateUsuario)

//função dos autores


//funções dos livros

module.exports = routes