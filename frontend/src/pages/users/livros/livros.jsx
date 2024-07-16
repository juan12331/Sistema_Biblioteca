import React from 'react'
import Navbar from '../../../components/Navbar'
import { useState, useEffect } from 'react'
import { getLivros } from '../../../services/APIservice'
import { Rating } from '@mui/material'
import './livros.css'

const livros = () => {
  let cpf = localStorage.getItem('cpf')

  const verificar = () => {
    if (cpf == null || cpf == undefined) {
      window.location.href = '/login'
    }
  }

  useEffect(() => {
    verificar();
    setLivros();
  }, [])


  const [books, setBooks] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  function setLivros(params) {
    getLivros(params).then(data => {
      setBooks(data)
    }).catch(err => console.log("deu erro :(", err))
  }

  function trimtext(text) {
    if (text.length > 12) {
      return text.substring(0, 12) + '...';
    }
    return text;
  }

  const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }

  const searchBooks = debounce((event) => {
    setLivros({ nome: event.target.value });
  }, 500);

  const redirect = (id) => {
    window.location.href = `/Usuarios/LivrosView/${id}`;
    
  }


  return (
    <>
      <Navbar />

      <div className="searchBooks">
        <input type="text" placeholder="Pesquisar" onChange={searchBooks} />
      </div>

      <div className="cardWrap" onMouseLeave={() => setHoveredIndex(null)}>
        {books.map((book, index) => (
          <div key={book.id_livro}
            className={`bookCard ${hoveredIndex !== null && hoveredIndex !== index ? 'dimmed' : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            onClick={() => redirect(book.id_livro)}
          >
            <div className='bookCover'>
              <img src={book.imagem} alt={book.nome} />
            </div>
            <div className='bookInfo'>
              <div className="rating">
                <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> <span className='total'>(7)</span>
              </div>
              <div className="title">
                {trimtext(book.nome)}
              </div>
              <div className="author">
                {book.autore.autor}
              </div>
            </div>
          </div>
        ))}
      </div>

    </>
  )
}

export default livros