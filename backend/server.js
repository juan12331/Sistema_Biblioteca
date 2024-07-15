const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const usuarios = require('./models/usuarios');
const livros = require('./models/livros');
const autores = require('./models/autores');
const reclamacoes = require('./models/reclamacoes')
const avaliacao = require('./models/avaliacao')
const cookieParser = require('cookie-parser')

usuarios.sync();
autores.sync();
livros.sync();
reclamacoes.sync();
avaliacao.sync();

usuarios.hasMany(reclamacoes, {
    foreignKey: 'cpf_usuario'
})


const app = express();

app.use(cookieParser())
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3001, () => console.log('servidor rodando na porta 3001'));