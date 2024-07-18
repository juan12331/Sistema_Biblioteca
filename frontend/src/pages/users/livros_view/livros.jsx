import React from 'react'
import Navbar from '../../../components/Navbar'
import { useState, useEffect } from 'react'
import './livros.css'
import { getLivrosById, getAutoresById } from '../../../services/APIservice'
import { useParams } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material'



const livros = () => {

  const [image, setImage] = useState('')
  const [nome, setNome] = useState('')
  const [editora, setEditora] = useState('')
  const [genero, setGenero] = useState('')
  const [descricao, setDesc] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [autor, setAutor] = useState('')


  const { id } = useParams()

  function preencher(id) {
    getLivrosById(id).then(data => {
      console.log(data)
      setImage(data.imagem)
      setNome(data.nome)
      setEditora(data.editora)
      setGenero(data.genero)
      setDesc(data.descricao)
      setQuantidade(data.qtd_disponivel)
      getAutoresById(data.id_autor).then(data => {
        setAutor(data.autor)
      })

    }).catch(error => console.error(error))
  }


  let cpf = localStorage.getItem('cpf')

  const verificar = () => {
    if (cpf == null || cpf == undefined) {
      window.location.href = '/login'
    }
  }

  useEffect(() => {
    verificar()
    preencher(id)
  }, [])


  return (
    <div className="bod">
      <Navbar />

      <div className="conectar">
        <div className="imagem">
          <img src={image} alt="" />
        </div>

        <div className="textLivrosEmprestados">
          <div className="titulo"> {nome} </div>
          <div className="autor"> {autor} </div>
          <span className='quantidade'> {quantidade} remanescentes </span>
          <div className="editora"> editora: {editora} </div>
          <div className="genero"> {genero} </div>
          <div className="descricao"> Descrição: <br /> {descricao} </div>
          <Button variant="contained" className='buttonEmprestimo' startIcon={<AddIcon />}>
          Emprestar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default livros