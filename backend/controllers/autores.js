const { Op } = require('sequelize');
const Autores = require('../models/autores');
const livros = require('../models/livros')

exports.createAutor = async (req, res) => {
    const verificacao = await Autores.findByPk(req.params.id_autor);
    if (verificacao){
        return res.send ('Autor ja existente')
    }

    const autorCriado = await Autores.create(req.body)
    console.log(autorCriado)
    return res.send('Autor cadastrado com sucesso')
}

exports.getAutor = async (req, res) => {
    try {
        const { id_autor, autor} = req.query || {};

        if(!id_autor && !autor ) {
            const autores = await Autores.findAll();
            return res.send(autores)
        }


        const pesquisa = {
            [Op.or]: [
                id_autor ? { id_autor: { [Op.like]: `%${id_autor}%` } } : undefined,
                autor ? { autor: { [Op.like]: `%${autor}%` } } : undefined,
            ].filter(Boolean)
        }

        const autores = await Autores.findAll({ where: pesquisa})
        return res.send(autores)

    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal Server Error');
    }
}