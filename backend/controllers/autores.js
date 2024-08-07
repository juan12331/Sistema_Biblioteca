const { Op } = require('sequelize');
const Autores = require('../models/autores');
const Livros = require('../models/livros')

exports.createAutor = async (req, res) => {
    await Autores.create(req.body)
    return res.send('Autor cadastrado com sucesso')
}

exports.getAutor = async (req, res) => {
    try {
        const { id_autor, autor } = req.query || {};

        if (!id_autor && !autor) {
            const autores = await Autores.findAll({
                include: [{
                    model: Livros
                }]
            });
            return res.send(autores)
        }


        const pesquisa = {
            [Op.or]: [
                id_autor ? { id_autor: { [Op.like]: `%${id_autor}%` } } : undefined,
                autor ? { autor: { [Op.like]: `%${autor}%` } } : undefined,
            ].filter(Boolean)
        }

        const autores = await Autores.findAll({
            where: pesquisa, include: [{
                model: Livros
            }], limit: 50   
        })
        return res.send(autores)

    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal Server Error');
    }
}

exports.deleteAutor = async (req, res) => {
    const pegaAutor = await Autores.findByPk(req.params.id)
    try {
        if (pegaAutor) {
            await pegaAutor.destroy();
            return res.status(200).send("Usuario deletado com sucesso")
        }

        return res.status(404).send('Autor not found!')

    } catch (error) {
        return res.status(500).send(error)
    }
}

exports.updateAutor = async (req, res) => {
    try {
        const id = req.params.id
        const verificaAutor = await Autores.findOne({ where: { id_autor: id } })
        if (verificaAutor) {
            const [Updates] = await Autores.update(req.body, { where: { id_autor: id } })
            return res.status(200).send("Autor Updatado com sucesso!!")
        }
        return res.status(404).send('Autor not Found!!!')
    } catch (error) {
        return res.status(500).send('Internal Server Error')
    }
}

exports.getAutoresById = async (req, res) => {
    try {
        const Autor = await Autores.findOne({ where: { id_autor: req.params.id } })
        return res.status(200).send(Autor)
    } catch {
        return res.status(500).send('Internal Server Error')
    }
}