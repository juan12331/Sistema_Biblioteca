import React from 'react'
import Navbar from '../../../components/Navbar'
import { useState, useEffect } from 'react'
import './create.css'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { createReclamacoes } from '../../../services/APIservice';

const create = () => {
  let cpf = localStorage.getItem('cpf')

  const [mensagem, setMensagem] = useState('')
  const [assunto, setAssunto] = useState('')

  // assunto, reclamacao, usuarioCpf

  const criarReclamacao = () => {
    console.log(cpf)
     createReclamacoes(assunto, mensagem, cpf).then(data => {
        console.log(data)
      })
  }


  const verificar = () => {
    if (cpf == null || cpf == undefined) {
      window.location.href = '/login'
    }
  }

  useEffect(() => {
    verificar()
  }, [])

  
  return (
    <div className="bod">
      <Navbar />


      <div className="corPo">
        <div className="emailArea">
          <div className="titulo">Fale conosco <br />
          </div>
          <div className="assunto">
            <div className="assuntoText">
              Assunto:
            </div>
            <input type="text" value={assunto} onChange={(e) => setAssunto(e.target.value)} />
          </div>
          <div className="mensagem">
            <div className="textareaMensagem">
              Mensagem:
            </div>
            <textarea name="" id="" value={mensagem} onChange={(e) => setMensagem(e.target.value)}></textarea>
          </div>

          <div className="botao">
            <Button variant="contained" onClick={criarReclamacao} > <AddIcon /> Criar</Button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default create