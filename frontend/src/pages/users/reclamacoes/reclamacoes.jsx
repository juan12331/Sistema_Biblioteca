import React from 'react'
import Navbar from '../../../components/Navbar'
import { useState, useEffect } from 'react'
import { getAllReclamacoes } from '../../../services/APIservice'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './reclamacoes.css'

const reclamacoes = () => {
  
  let cpf = localStorage.getItem('cpf')
  const [reclamacoes, setReclamacoes] = useState([])

  const verificar = () => {
    if (cpf == null || cpf == undefined) {
      window.location.href = '/login'
    }
  }

  const searchReclamacoes = () => {

  }

  const pegarReclamacoes = () => {
    getAllReclamacoes().then(data =>{
      setReclamacoes(data)
      console.log(data)
    }).catch(err => console.error(err))
  }

  const redirecionar = () => {
    window.location.href = '/Usuarios/CreateReclamacoes'
  }

  useEffect(() => {
    verificar()
    pegarReclamacoes()
  }, [])

  return (
    <>
    <div className="bod">
      <Navbar/>
      <div className="reclamacoes">
      <div className="searchbox">
        <Button variant="contained" onClick={redirecionar} > <AddIcon/> Criar</Button>

      </div>
      {reclamacoes.map(reclamacoes => (
        <div className="reclamacoesContainer">
        <div className="cpf_usuario">
          <AccountCircleIcon/> <span> {reclamacoes.cpf} </span> 
        </div>

        <div className="assunto">
            <span>Assunto: {reclamacoes.assunto}</span>
        </div>

        <div className="reclamacao">
            Reclamação: {reclamacoes.reclamacao}
        </div>
    </div>

      ))
      }
      </div>
      </div>
    </>
  )
}

export default reclamacoes