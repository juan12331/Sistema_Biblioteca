import React from 'react'
import Button from '@mui/material/Button';
import Sidebar from '../../../components/Drawer'
import { useEffect } from 'react';
import { getUsersByCpf } from '../../../services/APIservice'
import  './emprestimos_livros.css'


const emprestimos_livros = () => {
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

export default emprestimos_livros