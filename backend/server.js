const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const usuarios = require('./models/usuarios');
const livros = require('./models/livros');
const autores = require('./models/autores');
const reclamacoes = require('./models/reclamacoes')
const avaliacao = require('./models/avaliacao')

usuarios.sync();
livros.sync();
autores.sync();
reclamacoes.sync();
avaliacao.sync();


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3001, () => console.log('servidor rodando na porta 3001'));