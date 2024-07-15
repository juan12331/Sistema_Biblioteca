import React from 'react'
import Button from '@mui/material/Button';
import Sidebar from '../../../components/Drawer'


const emprestimos_livros = () => {
  function sair() {
    localStorage.clear();
    window.location.href = "/Cadastro"
}

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