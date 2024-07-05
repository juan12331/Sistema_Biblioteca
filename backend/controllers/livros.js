const { Op } = require('sequelize');
const Livros = require('../models/livros');


exports.getUsers = async (req, res) => {
    try {
        const { nome, genero, editora, autor} = req.query || {};

        if(!nome, !genero, !editora, !autor) {
            const Livros = Livros.findAll();
            return res.send(Livros)
        }


        const pesquisa = {
            [Op.or]: [
                nome ? { nome: { [Op.like]: `%${nome}%` } } : undefined,
                genero ? { genero: { [Op.like]: `%${genero}%` } } : undefined,
                editora ? { editora: { [Op.like]: `%${editora}%` } } : undefined
            ].filter(Boolean)
        }

        const livros = await Livros.findAll({ where: pesquisa})
        return res.send(livros)

    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal Server Error');
    }
}