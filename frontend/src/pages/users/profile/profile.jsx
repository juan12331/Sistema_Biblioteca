import React from 'react'
import Navbar from '../../../components/Navbar'
import { useState, useEffect } from 'react'
import { getUsersByCpf } from '../../../services/APIservice'
import Avatar from '@mui/material/Avatar';
import './profile.css'



const profile = () => {

  let cpf = localStorage.getItem('cpf')

  const [nome, setNome] = useState('')

  const verificar = () => {
    if (cpf == null || cpf == undefined) {
      window.location.href = '/login'
    }
  }

  function sair() {
    localStorage.clear()
    window.location.href = '/login'
  }

  useEffect(() => {
    verificar()
  }, [])

  return (
    <>

    <div className="bod">
      <div className="nav">
      <Navbar/>
      </div>
      <div className="boddie">

      <div className="sidebarra">

        <div className="imagemProfile">
          <img src="https://cdn1023.clicrbs.com.br/wp-content/uploads/sites/2/2022/02/fatos-rock-tela-1.png" alt="" />
        </div>

      <Avatar src="/broken-image.jpg" className='AvatarProfile'  
      sx={{ width: 100, height: 100 }}
       />

      <span className="nomeText">
        Olá {nome}
      </span>

      <span className="Lista1 Lista">
        Livros
      </span>

      <span className="Lista">
        Reclamações
      </span>

      <span className="Lista Sair" onClick={sair}>
        Sair
      </span>


      </div>
      <div className="livros">
        books
      </div>


      </div>
      </div>
    </>
  )
}

export default profile