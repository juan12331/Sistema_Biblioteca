import React from 'react'
import Sidebar from '../../../components/Drawer';
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { getUsersByCpf } from '../../../services/APIservice'

import { getAutores, deleteAutores } from '../../../services/APIservice';


const autores = () => {

  let cpf = localStorage.getItem('cpf')

  function verificarAutenticacao() {
    if (cpf == null || cpf == undefined) {
      window.location.href = ""
    }
  }

  const [search, setSearch] = useState([])
  const [autores, setAutores] = useState([])

  function sair() {
    localStorage.clear();
    window.location.href = "/Login"
  }

  function getAutor() {
    getAutores({ autor: search }).then(data => {
      setAutores(data)
      console.log(data)
    })

  }

  let cpfVerificar = localStorage.getItem('cpf')

  function verificar123() {
    if (cpfVerificar == null || cpfVerificar == undefined) {
      window.location.href = '/login'
    }
    getUsersByCpf(cpfVerificar).then(data => {
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
    getAutor()
  }, [])


  function redirecionarUpdate(id_autor) {
    window.location.href = `/Adm/Atualizar_autor/${id_autor}`
  }

  async function deletar(id_autor) {
    await deleteAutores(id_autor)
    getAutor()
  }


  return (
    <>
      <div className="header">
        <Sidebar />
        <div className="text">
          AUTORES
        </div>
        <button className='button1 delete' onClick={sair} >sair</button>

      </div>
      <div className="top">
        <input type="text" className="input" onChange={(e) => { setSearch(e.target.value) }} />
        <Button variant="contained" color="success" className='sucess' onClick={getAutor} >Pesquisar</Button>
        <a href="/Adm/Cadastrar_autor" className='cadastrarLivro' >Cadastrar Autor</a>
      </div>

      <div className="cardWrap">
        {autores.map((autor) => (
          <div className='card' key='ajsdald'>
            <div className="nome">
              {autor.autor}
            </div>
            <span>Livros: </span>
            {autor.livros.map((livros) => (
              <div className="livros"> {livros.nome}</div>
            ))

            }


            <button value={autor.id_autor} id='delete' className='button1 delete' onClick={() => deletar(autor.id_autor)}> Deletar </button>
            <button value={autor.id_autor} id='edit' className='button1 edit' onClick={() => redirecionarUpdate(autor.id_autor)}> Editar </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default autores