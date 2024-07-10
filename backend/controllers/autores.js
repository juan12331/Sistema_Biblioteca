const { Op } = require('sequelize');
const Autores = require('../models/autores');

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

exports.deleteAutor = async (req, res) => {
     try {
        const pegaAutor = Autores.findOne({ where: {id_autor: req.params.id_autor}})
        if (pegaAutor) {    
            await pegaAutor.destroy();
            return res.status(200).send("Usuario deletado com sucesso")
        }

            return res.status(404).send('Autor not found!')

     }catch (error ) {
        return res.status(500).send('Internal Server Erro')
     }
}