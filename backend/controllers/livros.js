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

    const livros = await Livros.findAll({ where: pesquisa, include: autores})

    
    
    return res.send(livros)
}

exports.deleteLivros = async (req, res) => {
    
    try{
        const encontaLivro = await Livros.findByPk(req.params.id)
        if (encontaLivro) {
        await encontaLivro.destroy();
        return res.send('usuario deletado')
    }
    } catch(err) {
        return res.send('aqui deu erro mn se liga', err)
    }
}

exports.updateLivro = async (req, res) => {
    const id = req.params.id
    console.log(id)
    const idLivro = await Livros.findOne({ where: { id_livro: id } })
    if (idLivro) {
        try {
            const [Updates] = await Livros.update(req.body, { where:  { id_livro: id } }) // verifica se tem alguma alteração
            return res.send({ message: 'Livro atualizado', })

        } catch (error) {
            return res.send('putz... deu erro aqui meu mano ==> ', error)

        }
    }
    return res.send('esse livro nem existe mano?_?')
}


exports.getLivrosById = async (req, res) => {
    try {
        const encontaLivro = await Livros.findByPk(req.params.id);
        if (!encontaLivro) {
            return res.status(404).send('Book not found');
        }
        return res.send(encontaLivro);
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}
 
exports.getLivrosByAutores = async (req, res) => {
    try{
        const encontraLivro = await Livros.findAll({where: {id_autor: req.params.id_autor}, include: autores })
        return res.send(encontraLivro)
    }catch{
        return res.status(500).send('Internal Server Error');
    }
}