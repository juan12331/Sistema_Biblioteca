import React from 'react'
import Sidebar from '../../../components/Drawer'

import { updateLivros, getAutores, getLivrosById } from '../../../services/APIservice'
//id, nome, genero, data_criacao, editora, qtd_disponivel, id_autor

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import './update.css'

import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';


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
    const [imagem, setImage] = useState('')
    const [descricao, setDescricao] = useState('')

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
          setImage(data.imagem)
          setDescricao(data.descricao)
          
        }).catch(err => console.log(err))
      }

    useEffect(() => {
        PegarAutores()
        preencher(id)
    }, [])

    function update () {

        console.log(imagem)
        console.log(descricao)

        if (nome == '' || genero == '' || data == '' || quantidade == '' || autorId == '' || descricao == '' || imagem == '') {
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
        } if (descricao.length >= 499) {
            showError('Descrição muito longa')
            return
        }
        console.log(imagem)
        console.log(descricao)
        updateLivros(id, nome, genero, data, editora, quantidade, autorId, imagem, descricao).then(data => {
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

    function sair() {
        localStorage.clear();
        window.location.href = "/Login"
    }

  return (
    <>
        <div className="header">
            <Sidebar/>
            <div className="text">
                ATUALIZAR LIVROS
            </div>
            <button className='button1 delete' onClick={sair} >sair</button>
        </div>

        <div className="alinhar">
                <div className="row">
                    <input type="text" value={nome} onChange={(e) => setName(e.target.value)} placeholder='nome' className='textInputSozin' />
                </div>

                <div className="row">
                    <input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} placeholder='genero' className='textInput' />
                    <input type="text" value={data} onChange={(e) => setDate(e.target.value)} placeholder='Ano' className='textInput' />
                </div>

                <div className="row">
                    <input type="text" value={editora} onChange={(e) => setEditora(e.target.value)} placeholder='editora' className='textInput' />
                    <input type="Number" value={quantidade} onChange={(e) => setQuantia(e.target.value)} placeholder='quantidade' className='textInput' />
                </div>

                <div className="row">
                    <input type="text" value={imagem} onChange={(e) => setImage(e.target.value)} placeholder='Image' className='textInput' />
                    <input type="Number" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder='Descrição' className='textInput' />
                </div>
                <div className="row">
                    <select value={autorId} onChange={(e) => setId(e.target.value)} className='textInputSozin'>
                        <option value="">Selecione o autor</option>
                        {autores.map((autor) => (
                            <option value={autor.id_autor}>{autor.autor} </option>
                        ))

                        }
                    </select>
                </div>
                <div className="row">
                    <span className='span aviso' id='span'></span>
                </div>
                <div className="row">
                <Button variant="contained" startIcon={<SendIcon />} onClick={update} className='button'>Enviar</Button>
                <div className="margin">
                <Button variant="contained" color="error" startIcon={<CancelIcon />} onClick={voltar} className='button'>Cancelar</Button>
                </div>
                </div>
            </div>
    </>
  )
}

export default update