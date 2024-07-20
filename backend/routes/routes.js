const express = require('express')
const routes = express.Router();
const UsuariosControllers = require('../controllers/usuarios')
const AutoresControllers = require('../controllers/autores')
const LivrosControllers = require('../controllers/livros')
const ReclamacoesControllers = require('../controllers/reclamacoes')
const EmprestimosControllers = require('../controllers/emprestimos')
// FIX: adicionar obrigatoriadoredade de token nas rotas


//função dos usuarios

routes.get('/usuarios', UsuariosControllers.getUsers)
routes.get('/usuarios/:cpf', UsuariosControllers.getUsersByCpf)

routes.post('/login', UsuariosControllers.login)

routes.post('/usuarios', UsuariosControllers.createUsuario)
routes.delete('/usuarios/:cpf', UsuariosControllers.deleteUsuario)
routes.put('/usuarios/:cpf', UsuariosControllers.updateUsuario)

//função dos autores

routes.get('/autores', AutoresControllers.getAutor)
routes.get('/autores/:id', AutoresControllers.getAutoresById)

routes.post('/autores', AutoresControllers.createAutor)

routes.delete('/autores/:id', AutoresControllers.deleteAutor)

routes.put('/autores/:id', AutoresControllers.updateAutor)

//funções dos livros

routes.post('/livros', LivrosControllers.createLivros)

routes.get('/livros', LivrosControllers.getLivros)
routes.get('/livros/:id', LivrosControllers.getLivrosById)


routes.delete('/livros/:id', LivrosControllers.deleteLivros)

routes.put('/livros/:id', LivrosControllers.updateLivro)

//funções das reclamacoes

routes.post('/reclamacoes', ReclamacoesControllers.createReclamacoes)

routes.delete('/reclamacoes/:id', ReclamacoesControllers.deleteReclamacoes)

routes.get('/reclamacoes', ReclamacoesControllers.getAllReclamacoes)
routes.get('/reclamacoes/:id', ReclamacoesControllers.getReclamacoesById)

//funções das avaliações

module.exports = routes