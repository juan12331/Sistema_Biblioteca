import { useEffect, useState } from 'react'
import React from 'react'
import Sidebar from '../../../components/Drawer';
import Button from '@mui/material/Button';
import { createLivros, getAutores } from '../../../services/APIservice';

import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import './create.css'
import { getUsersByCpf } from '../../../services/APIservice'

// nome, genero, data_criacao, editora, qtd_disponivel, id_autor

const create = () => {

    const rageYear = /^\d{1,4}$/;
    const rageQuantidade = /^\d{1,2}$/;
    const rageLetras = /^[^a-zA-Z]*$/


    const [autores, setAutores] = useState([])

    function PegarAutores() {
        getAutores().then(data => {
            setAutores(data)
        })
    }

    const [nome, setName] = useState('')
    const [genero, setGenero] = useState('')
    const [data, setDate] = useState('')
    const [editora, setEditora] = useState('')
    const [quantidade, setQuantia] = useState('')
    const [autorId, setId] = useState('')
    const [imagem, setImage] = useState('')
    const [descricao, setDescricao] = useState('')

    let cpf = localStorage.getItem('cpf')

    function verificar123 () {
        if (cpf == null || cpf == undefined) {
          window.location.href = '/login'
        }
        getUsersByCpf(cpf).then(data => {
          if (data.papel == 'user'){
            window.location.href = "/Usuarios/LivrosUsers"
            return;
          } if (data.papel == 'adm') {
            return
          }
        })
      }

    useEffect(() => {
        PegarAutores()
        verificar123()
    }, [])

    function Criar() {

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
        } if (!rageLetras.test(quantidade)) {
            showError('insira uma quantidade valida')
            return
        } if (!rageLetras.test(data)) {
            showError('insira uma data valida')
            return
        } if (descricao.length >= 499) {
            showError('Descrição muito longa')
            return
        }

        createLivros(nome, genero, data, editora, quantidade, autorId, imagem, descricao).then(data => {
            voltar()
        }).catch(err => console.log(err))
        voltar()
    }


    const showError = (message) => {
        const span = document.getElementById('span');
        span.textContent = message;
    }

    function voltar() {
        window.location.href = "/Adm/Livros"
    }
    
    function sair() {
        localStorage.clear();
        window.location.href = "/Login"
    }


    return (
        <div>
            <div className="header">
                <Sidebar />
                <div className="text">
                    REGISTRAR LIVROS
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
                    <input type="text" value={imagem} onChange={(e) => setImage(e.target.value)} placeholder='Url da imagem' className='textInput' />
                    <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder='descricao' className='textInput' />
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
                <Button variant="contained" startIcon={<SendIcon />} onClick={Criar} className='button'>Enviar</Button>
                <div className="margin">
                <Button variant="contained" color="error" startIcon={<CancelIcon />} onClick={voltar} className='button'>Cancelar</Button>
                </div>
                </div>
            </div>


        </div>
    )
}

export default create