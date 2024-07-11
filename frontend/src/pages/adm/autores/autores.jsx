import React from 'react'
import Sidebar from '../../../components/Drawer';
import { useEffect, useState } from 'react'
import Button from '@mui/material/Button';


import { getAutores, deleteAutores } from '../../../services/APIservice';


const autores = () => {

  const [search, setSearch] = useState([])
  const [autores, setAutores] = useState([])

    function sair() {
        window.location.href = "/Cadastro"
    }

    function getAutor() {
      getAutores({ autor: search }).then(data => {
        setAutores(data)
        console.log(data)
      })
      
    }

    useEffect(() => {
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
            <Button variant="contained" color="success"  className='sucess' onClick={getAutor} >Pesquisar</Button>
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
                <div className="livros"> { livros.nome }</div>
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