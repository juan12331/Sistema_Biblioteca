const { Op, where, Model } = require('sequelize');
const Emprestimos = require('../models/emprestimos');
const Livros = require('../models/livros');
const Usuarios = require('../models/usuarios');

exports.createEmprestimos = async (req, res) => {
    try {
        const Emprestimo = await Emprestimos.create(req.body)
        console.log(Emprestimo)
        return res.status(201).send(Emprestimo)
    } catch (error) {
        return res.status(500).send(error)
    }
}

exports.getAllEmprestimos = async (req, res) => {
    try {

        const { nome, cpf } = req.query || {};

        if (!nome && !cpf) {
            const EmprestimosInformacoes = await Usuarios.findAll({
                include: [{
                    model: Livros, right: true
                }]
            })
            return res.send(EmprestimosInformacoes)
        }

        const pesquisa = {
            [Op.or]: [
                nome ? { nome: { [Op.like]: `%${nome}%` } } : undefined,
                cpf ? { cpf: { [Op.like]: `%${cpf}%` } } : undefined,
            ].filter(Boolean)
        }

        const EmprestimosInformacoes = await Usuarios.findAll({
            where: pesquisa, include: [{
                model: Livros, right: true
            }]
        })
        return res.send(EmprestimosInformacoes)

    } catch (error) {
        return res.status(500).send(error)
    }
}


exports.getEmprestimosByCpf = async (req, res) => {
    try {
        Cpf = req.params.cpf
        const EmprestimosInformacoes = await Usuarios.findAll({
            where: { cpf: Cpf }, include: [{
                model: Livros, right: true
            }]
        })

        return res.status(200).send(EmprestimosInformacoes)
    }
    catch (error) {
        return res.status(500).send(error)
    }
}

exports.getEmprestimosById = async (req, res) => {
    try {
        const emprestimo = await Emprestimos.findOne({ where: { id: req.params.id } })
        return res.status(200).send(emprestimo)
    } catch (error) {
        return res.satus(500).send(error)
    }
}

exports.updateEmprestimos = async (req, res) => {
    try {
        const id = req.params.id
        const idEmprestimo = await Emprestimos.findOne({ where: { id: id } })
        if (idEmprestimo) {
            const [Updates] = await Emprestimos.update(req.body, { where: { id: id } }) // verifica se tem alguma alteração
            return res.send({ message: 'Status atualizado', })
        }
        return res.status(404).send('Emprestimo not found :)')

    } catch (error) {
        return res.status(500).send(error)
    }
}

exports.deleteEmprestimos = async (req, res) => {
    try {
        const EncontrarEmprestimos = await Emprestimos.findByPk(req.params.id)
        if (EncontrarEmprestimos) {
            await EncontrarEmprestimos.destroy()
            return res.status(200).send('Emprestimo deletado')
        }
        return res.status(404).send('Emprestimo not found :(')

    } catch (error) {
        return res.status(500).send(error)
    }
}

