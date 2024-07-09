const { Op } = require('sequelize');
const Livros = require('../models/livros');


exports.createLivros = async (req, res) => {
    const verificacao = await Livros.findByPk(req.params.id_livro);
    if (verificacao){
        return res.send ('Livro ja existente')
    }

    const livroCriado = await Livros.create(req.body)
    console.log(livroCriado)
    return res.send('Livro cadastrado com sucesso')
}