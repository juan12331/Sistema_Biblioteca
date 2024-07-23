import React from 'react'
import Navbar from '../../../components/Navbar'
import { useState, useEffect } from 'react'
import { getUsersByCpf, getEmprestimosByCpf } from '../../../services/APIservice'
import Avatar from '@mui/material/Avatar';
import './profile.css'


const profile = () => {

  let cpf = localStorage.getItem('cpf')

  const [nome, setNome] = useState('')
  const [books, setBooks] = useState([]);

  const verificar = () => {
    if (cpf == null || cpf == undefined) {
      window.location.href = '/login'
    }
    getEmprestimosByCpf(cpf).then(data => {
      console.log(data[0].livros)
      setBooks(data[0].livros)
    })
  }

  function sair() {
    localStorage.clear()
    window.location.href = '/login'
  }

  function trimtext(text) {
    if (text.length > 12) {
      return text.substring(0, 12) + '...';
    }
    return text;
  }

  function RelamacoesRedirect() {
    window.location.href = "/Usuarios/ReclamacoesUsers"
  }

  function LivrosRedirect () {
    window.location.href = "/Usuarios/LivrosUsers"
  }

  function pegarUsuario() {
    getUsersByCpf(cpf).then(data => {
      setNome(data.nome)
    })
  }


  useEffect(() => {
    pegarUsuario()
    verificar()
  }, [])

  return (
    <>

      <div className="bod">
        <div className="nav">
          <Navbar />
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
              Olá, {nome}
            </span>

            <span className="Lista1 Lista" onClick={LivrosRedirect}>
              Livros
            </span>

            <span className="Lista" onClick={RelamacoesRedirect}>
              Reclamações
            </span>

            <span className="Lista Sair" onClick={sair}>
              Sair
            </span>


          </div>
          <div className="cardwrap" onMouseLeave={() => setHoveredIndex(null)}>
            {books.map((book, index) => (
              <div key={book.id_livro}
                className={`bookCard`}
                onMouseEnter={() => setHoveredIndex(index)}
                onClick={() => redirect(book.id_livro)}
              >
                <div className='bookCover'>
                  <img src={book.imagem} alt={book.nome} className='ImagemBook' />
                </div>
                <div className='bookInfo'>

                  <div className="title">
                    {trimtext(book.nome)}
                  </div>

                </div>
              </div>
            ))}
          </div>
          


        </div>
      </div>
    </>
  )
}

export default profile