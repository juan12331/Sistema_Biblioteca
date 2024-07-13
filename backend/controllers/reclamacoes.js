const { Op } = require('sequelize');
const Reclamacoes = require('../models/reclamacoes');

exports.createReclamacoes = async (req, res) => {
    try {
        await Reclamacoes.create(req.body)
        return res.status(201).send('Reclamação criada com sucesso')
    } catch (err) {
        return res.status(500).send(err)
    }

}
exports.deleteReclamacoes = async (req, res) => {
    try {
        const encontaReclamacao = await Reclamacoes.findByPk(req.params.id)
        if (encontaReclamacao) {
            await encontaReclamacao.destroy();
            return res.status(200).send('usuario deletado')
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}

exports.getAllReclamacoes = async (req, res) => {

    try {

        const { cpf_usuario, reclamacao, usuarioCpf, assunto } = req.query || {};
        console.log('chegou aqui')

        if (!cpf_usuario || !reclamacao || !usuarioCpf || !assunto) {
            const reclamacoes = await Reclamacoes.findAll();
            console.log(reclamacoes)
            return res.send(reclamacoes)
        }
        //FIX: ordenar por OrderBy

        const pesquisa = {
            [Op.or]: [
                cpf_usuario ? { cpf_usuario: { [Op.like]: `%${cpf_usuario}%` } } : undefined,
                reclamacao ? { reclamacao: { [Op.like]: `%${reclamacao}%` } } : undefined,
                usuarioCpf ? { usuarioCpf: { [Op.like]: `%${usuarioCpf}%` } } : undefined,
                assunto ? { assunto: { [Op.like]: `%${assunto}%` } } : undefined,
            ].filter(Boolean)
        }

        const reclamacoes = await Reclamacoes.findAll({ where: pesquisa })
        return res.send(reclamacoes)
    } catch (err) {
        console.error(err)
        return res.status(500).send('Internal Server Error');
    }
}

exports.getReclamacoesById = async (req, res) => {
    try{
        const encontaReclamacao = await Reclamacoes.findByPk(req.params.id)
        if ( !encontaReclamacao ) {
            return res.satus(404).send("reclamacao not found")
        }   
        return res.send(encontaReclamacao)

    } catch (error) {
        return res.status(500).send(error)
    }
}

exports.AumentarClassificacao = async (req, res) => {
    //TODO: aumentar a classificacao da reclamacao
}