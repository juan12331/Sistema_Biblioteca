import React from 'react'
import Sidebar from '../../../components/Drawer'
import { Button } from '@mui/material'
import { useState, useEffect } from 'react'
import './reclamacoes.css'
import { getAllReclamacoes, deleteReclamacao } from '../../../services/APIservice'

const reclamacoes = () => {

  const [search, setSearch] = useState([])
  const [reclamacoes, setReclamacoes] = useState([])

//cpf_usuario, reclamacao, usuarioCpf, assunto
  function getReclamacoes() {
    getAllReclamacoes({ cpf_usuario: search, reclamacao: search, usuarioCpf: search, assunto: search }).then(data => {
      setReclamacoes(data)
    }).catch(err => console.log("deu erro :(", err))

  }

  useEffect(() => {
    getReclamacoes()
  }, [])

  function sair() {
    localStorage.clear();
    window.location.href = "/Cadastro"
}

  function view(id_reclamacoes) {
    window.location.href = `/Adm/ViewReclamacoes/${id_reclamacoes}`
  }

  async function deletar(id_reclamacoes) {
    await deleteReclamacao(id_reclamacoes)
    getReclamacoes()
  }

  function limite(text) {
    if (text.length > 20) {
      return text.substring(0, 20) + '...'
    }
    return text;
   
  }

  return (
    <>
      <div className="header">
        <Sidebar />
        <div className="text">
          RECLAMAÇÕES
        </div>
        <button className='button1 delete' onClick={sair} >sair</button>

      </div>

      <div className="top">
        <input type="text" className="input" onChange={(e) => { setSearch(e.target.value) }} />
        <Button variant="contained" color="success" className='sucess' onClick={getReclamacoes} >Pesquisar</Button>
      </div>

      <div className="cardWrap">
        {reclamacoes.map((reclamacoes) => (
          <div className='card' key={reclamacoes.id_reclamacoes}>
            <div className="nome">
              Assunto: {reclamacoes.assunto}
            </div>
            <div className="genero">
              {limite(reclamacoes.reclamacao)}
            </div>
            <button value={reclamacoes.id_reclamacoes} id='delete' className='button1 delete' onClick={() => deletar(reclamacoes.id_reclamacoes)}> Deletar </button>
            <button value={reclamacoes.id_reclamacoes} id='edit' className='button1 edit' onClick={() => view(reclamacoes.id_reclamacoes)}> view </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default reclamacoes