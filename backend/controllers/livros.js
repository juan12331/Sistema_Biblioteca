const { Op } = require('sequelize');
const Livros = require('../models/livros');
const autores = require('../models/autores');


exports.createLivros = async (req, res) => {
    const verificacao = await Livros.findByPk(req.params.id_livro);
    if (verificacao){
        return res.send ('Livro ja existente')
    }

    const livroCriado = await Livros.create(req.body)
    console.log(livroCriado)
    return res.status(201)
}

exports.getLivros = async (req, res) => {
    const { nome, genero} = req.query || {};

    if(!nome && !genero ) {
        const livros = await Livros.findAll({ include: autores });
        return res.send(livros)
    }

    const pesquisa = {
        [Op.or]: [
            nome ? { nome: { [Op.like]: `%${nome}%` } } : undefined,
            genero ? { genero: { [Op.like]: `%${genero}%` } } : undefined,
        ].filter(Boolean)
    }

    const livros = await Livros.findAll({ where: pesquisa})

    
    
    return res.send(livros)
}