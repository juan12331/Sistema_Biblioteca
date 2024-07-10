import React from 'react'
import Sidebar from '../../../components/Drawer'

import { updateLivros, getAutores, getLivrosById } from '../../../services/APIservice'
//id, nome, genero, data_criacao, editora, qtd_disponivel, id_autor

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import './update.css'

const update = () => {

    const { id } = useParams()

    const rageYear = /^\d{1,4}$/;
    const rageQuantidade = /^\d{1,3}$/;
    const rageLetras = /^[^a-zA-Z]*$/

    const [autores, setAutores] = useState([])
    const [nome, setName] = useState('')
    const [genero, setGenero] = useState('')
    const [data, setDate] = useState('')
    const [editora, setEditora] = useState('')
    const [quantidade, setQuantia] = useState('')
    const [autorId, setId] = useState('')

    function PegarAutores() {
        getAutores().then(data => {
            setAutores(data)
        })
    }

    function preencher(id){
        getLivrosById(id).then(data => {
          setName(data.nome)
          setGenero(data.genero)
          setEditora(data.editora)
          setQuantia(data.qtd_disponivel)
          setDate(data.data_criacao)
          setId(data.id_autor)
    
          
                  
        }).catch(err => console.log(err))
      }

    useEffect(() => {
        PegarAutores()
        preencher(id)
    }, [])

    function update () {

        if (nome == '' || genero == '' || data == '' || quantidade == '' || autorId == '') {
            showError('preencha todos os campos')
            return;
        } if (quantidade < 0) {
            showError('Como tem livros negativos?')
            return
        } if (!rageYear.test(data)) {
            showError('Insira um ano valido')
            return
        } if (!rageQuantidade.test(quantidade)) {
            showError('não temos tantos livros assim pae')
            return
        } if(!rageLetras.test(quantidade)) {
            showError('insira uma quantidade valida')
            return
        } if (!rageLetras.test(data)) {
            showError('insira uma data valida')
            return
        }
        updateLivros(id, nome, genero, data, editora, quantidade, autorId).then(data => {
            voltar()
        }).catch(err => console.error(err))

    }

    const showError = (message) => {
        const span = document.getElementById('span');
        span.textContent = message;
    }

    function voltar() {
        window.location.href = '/Adm/Livros'
    }


  return (
    <>
        <div className="header">
            <Sidebar/>
            <div className="text">
                ATUALIZAR LIVROS
            </div>
            <button className='button1 delete' >sair</button>
        </div>

        <input type="text" value={nome} onChange={(e) => setName(e.target.value)} placeholder='nome' />
            <input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} placeholder='genero' />
            <input type="text" value={data} onChange={(e) => setDate(e.target.value)} placeholder='Ano' />
            <input type="text" value={editora} onChange={(e) => setEditora(e.target.value)} placeholder='editora' />
            <input type="Number" value={quantidade} onChange={(e) => setQuantia(e.target.value)} placeholder='quantidade' />
            <select value={autorId} onChange={(e) => setId(e.target.value)} className='select'>
                <option value="">Selecione</option>
                {autores.map((autor) => (
                    <option value={autor.id_autor}>{autor.autor}</option>
                ))

                }
            </select>
            <span className='span aviso' id='span'></span>
            <Button variant="contained" color="success" onClick={update}>Enviar</Button>
    </>
  )
}

export default update