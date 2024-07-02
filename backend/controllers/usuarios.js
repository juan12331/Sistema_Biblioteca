const { Op } = require('sequelize');
const usuarios = require('../models/usuarios')

exports.login = async (req, res) => {
    try {
        const {email, senha} = req.body;
        const encontrarUsuario = await usuarios.findOne({ where: {email, senha}})
        if (encontrarUsuario) {
            return res.send(encontrarUsuario);
        }
        return res.status(404).send('Usuario not found');
    } catch (error ) {
        return res.status(500).send('Internal Server error')
    }
}