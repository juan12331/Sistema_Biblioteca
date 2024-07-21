import React from 'react'
import Navbar from '../../../components/Navbar'
import { useState, useEffect } from 'react'
import './create.css'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const create = () => {
  let cpf = localStorage.getItem('cpf')

  const verificar = () => {
    if (cpf == null || cpf == undefined) {
      window.location.href = '/login'
    }
  }

  useEffect(() => {
    verificar()
  }, [])

  const redirecionar = () => {
    //TODO: something
  }

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
            <input type="text" />
          </div>
          <div className="mensagem">
            <div className="textareaMensagem">
              Mensagem:
            </div>
            <textarea name="" id=""></textarea>
          </div>

          <div className="botao">
            <Button variant="contained" onClick={redirecionar} > <AddIcon /> Criar</Button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default create