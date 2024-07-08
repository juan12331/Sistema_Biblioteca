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