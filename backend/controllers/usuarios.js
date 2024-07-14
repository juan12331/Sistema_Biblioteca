
const { Op } = require('sequelize');
const Usuarios = require('../models/usuarios');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const SECRET = process.env.SECRET;

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await Usuarios.findOne({ where: { email, senha } })
        if (usuario.email == email && usuario.senha == senha) {
            jwt.sign({ usuarioCpf: usuario.cpf }) 
            return res.send(usuario.papel);
        }
        return res.status(404).send('Usuario not found');
    } catch (error) {
        return res.status(500).send('Internal Server error')
    }
}

exports.getUsers = async (req, res) => {
    try {
        const { nome, email } = req.query || {};

        if (!nome && !email) {
            const usuarios = await Usuarios.findAll();
            return res.send(usuarios)
        }


        const pesquisa = {
            [Op.or]: [
                nome ? { nome: { [Op.like]: `%${nome}%` } } : undefined,
                email ? { email: { [Op.like]: `%${email}%` } } : undefined,
            ].filter(Boolean)
        }

        const usuarios = await Usuarios.findAll({ where: pesquisa })
        return res.send(usuarios)

    } catch (error) {
        console.error(error)
        return res.status(500).send('Internal Server Error');
    }
}

exports.getUsersByCpf = async (req, res) => {
    try {
        const encontrarUsuario = await Usuarios.findByPk(req.params.cpf);
        if (!encontrarUsuario) {
            return res.status(404).send('Usuario not found');
        }
        return res.send(encontrarUsuario);
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
}


exports.createUsuario = async (req, res) => {
    try {
        const verificacao = await Usuarios.findByPk(req.params.cpf);
        if (verificacao) {
            return res.send('usuario ja foi cadastrado')
        }

        const usuarioCriado = await Usuarios.create(req.body)
        console.log(usuarioCriado)
        return res.send('usuario cadastrado com sucesso')
    } catch (err) {
        return res.status(403).send('erro')
    }
}

exports.deleteUsuario = async (req, res) => {
    const encontrarUsuario = await Usuarios.findOne({ where: { cpf: req.params.cpf } })
    try {
        await encontrarUsuario.destroy();
        return res.send('usuario deletado')
    } catch (err) {
        return res.send('aqui deu erro mn se liga', err)
    }
}

exports.updateUsuario = async (req, res) => {
    const Cpf = req.params.cpf
    console.log(Cpf)
    const CpfUsuario = await Usuarios.findOne({ where: { cpf: Cpf } })
    console.log(CpfUsuario)

    if (CpfUsuario) {
        try {
            const [Updates] = await Usuarios.update(req.body, { where: { cpf: req.params.cpf } }) // verifica se tem alguma alteração
            return res.send({ message: 'Usuario foi atualizado ;P', })

        } catch (error) {
            return res.send('deu erro aqui meu mano ==> ', error)

        }
    }
    return res.send('usuario not found!!!')
}