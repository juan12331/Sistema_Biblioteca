import React from 'react'
import Sidebar from '../../../components/Drawer'
import './livros.css'
import Button from '@mui/material/Button';

import { getLivros, deleteLivros } from '../../../services/APIservice'
import { useEffect, useState } from 'react'



const livros = () => {

    const [search, setSearch] = useState([])
    const [livros, setLivros] = useState([])

    function getBooks() {
        getLivros({nome: search, genero: search}).then(data => {
            // setLivros(data)
            console.log(data)
            setLivros(data)
        }).catch(err => console.log("deu erro :(", err))
        
    }

    const formatDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedDate.getFullYear().toString();
    return `Publicado: ${day}/${month}/${year}`;
  }
    useEffect(() => {
        getBooks()
      }, [])

      async function deletar(id){
        console.log(id)
        await deleteLivros(id)
        getBooks()
      }

    return (
        <div><div className="header">
            <Sidebar />
        </div>
            <div className="top">
            <input type="text" className="input" onChange={(e) => { setSearch(e.target.value) }} />
            <Button variant="contained" color="success" onClick={getBooks} className='sucess' >Pesquisar</Button>
                <a href="/Adm/Create_Livros" className='cadastrarLivro' >Cadastrar livro</a>
            </div>

            <div className="livros">
            <div className="cardWrap">
          {livros.map((livro) => (
            <div className='card' key={livro.id_livro}>
              <div className="nome">
                {livro.nome}
              </div>
              <div className="genero">
                {livro.genero}
              </div>
              <div className="email">
                {livro.editora}
              </div>
              <div className="telefone">
                {livro.qtd_disponivel}
              </div>
              <div className="autor">
                {livro.autore.autor}
              </div>

              <div className="data_criacao">
                {formatDate(livro.data_criacao)}
              </div>
               <button value={livro.id_livro} id='delete' className='button1 delete' onClick={() => deletar(livro.id_livro)}> Deletar </button>
              {/*<button value={livro.id_livro} id='edit' className='button1 edit' onClick={() => redirecionarUpdate(user.cpf)}> Editar </button> */}
            </div> 
          ))}
        </div>
            </div>
        </div>
    )
}

export default livros