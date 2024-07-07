const { Op } = require('sequelize');
const Reclamacoes = require('../models/reclamacores');

exports.createReclamacoes = async (req, res) => {
    const createReclamacoes = await Reclamacoes.create(req.body);
    console.log(createReclamacoes);
    return res.send('reclamão')
}

exports.deleteReclamacoes = async (req, res) => {

try{

    const {cpf_usuario, reclamacao } = req.query || {}
    if(!cpf_usuario, !reclamacao) {
        
        return res.status(404).send('Not Found')
    }

    const acharReclamacao = {
        [Op.and]: [
            cpf_usuario ? { cpf_usuario: { [Op.like]: `%${cpf_usuario}%` } } : undefined,
            reclamacao ? { reclamacao: { [Op.like]: `%${reclamacao}%` } } : undefined,
        ].filter(Boolean)
    }

    const reclamacoes = await Reclamacoes.findOne({ where: pesquisa})
    await reclamacoes.destroy();

} catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
}
}

exports.getAllReclamacoes = async (req, res) => {

    try{

        const { cpf_usuario, reclamacao} = req.query || {};

        if(!cpf_usuario, !reclamacao) {
            const reclamacoes = Reclamacoes.findAll();
            return res.send(reclamacoes)
        }

        const pesquisa = {
            [Op.or]: [
                cpf_usuario ? { cpf_usuario: { [Op.like]: `%${cpf_usuario}%` } } : undefined,
                reclamacao ? { reclamacao: { [Op.like]: `%${reclamacao}%` } } : undefined,
            ].filter(Boolean)
        }

        const reclamacoes = await Reclamacoes.findAll({ where: pesquisa})
        return res.send(reclamacoes)
} catch (err) {
    console.error(err)
    return res.status(500).send('Internal Server Error');
}
}
