import React from 'react'
import { getReclamacoesById, getUsersByCpf , deleteReclamacao} from '../../../services/APIservice'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../../../components/Drawer'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './reclamacoes.css'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const relamacoes = () => {

    const { id } = useParams()

    const [nome, setNome] = useState('')
    const [assunto, setAssunto] = useState('')
    const [reclamacao, setReclamacao] = useState('')

    function preencher() {
        getReclamacoesById(id).then(data => {
            setAssunto(data.assunto)
            setReclamacao(data.reclamacao)
            getUsersByCpf(data.cpf_usuario).then(data => {
                setNome(data.nome)
            })
        })
    }

    useEffect(() => {
        preencher()
    }, [])

    function sair() {
        localStorage.clear();
        window.location.href = "/Login"
    }

    async function deletar () {
        await deleteReclamacao(id)
        voltar()
    }

    function voltar () {
        window.location.href = "/Adm/Reclamacoes"
    }

    return (
        <>
            <div className="header">
                <Sidebar />
                <div className="text">
                    ATUALIZAR LIVROS
                </div>
                <button className='button1 delete' onClick={sair} >sair</button>
            </div>
            <div className="reclamacoesContainer">
                <div className="cpf_usuario">
                    {<AccountCircleIcon />} {nome}
                </div>

                <div className="assunto">
                    <span>Assunto: {assunto}</span>
                </div>

                <div className="reclamacao">
                    Reclamação: {reclamacao}
                </div>
            </div>
            <div className="botoes">
        <Button variant="contained" startIcon={<ArrowBackIcon />} onClick={voltar} className='button'>Voltar</Button>
        <div className="margin">
        <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={deletar} className='button'>Deletar</Button>
        </div>
        </div>
        </>
    )
}

export default relamacoes