import React from 'react'
import Sidebar from '../../../components/Drawer'
import Button from '@mui/material/Button';

import { useEffect, useState } from 'react'
import { getUsersByCpf } from '../../../services/APIservice'

const emprestimoUpdate = () => {

  function sair() {
    localStorage.clear();
    window.location.href = "/Login"
  }

  let cpf = localStorage.getItem('cpf')

    function verificar123 () {
      if (cpf == null || cpf == undefined) {
        window.location.href = '/login'
      }
      getUsersByCpf(cpf).then(data => {
        if (data.papel == 'user'){
          window.location.href = "/Usuarios/LivrosUsers"
          return;
        } if (data.papel == 'adm') {
          return
        }
      })
    }


    useEffect(() => {
      verificar123()
    }, [])

  return (
    <>
    <div className="header">
    <Sidebar />
    <div className="text">
      Emprestimos de Livros
    </div>
    <button className='button1 delete' onClick={sair} >sair</button>
  </div>

  </>
  )
}

export default emprestimoUpdate