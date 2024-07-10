import { useEffect, useState } from 'react'
import React from 'react'
import Sidebar from '../../../components/Drawer';
import Button from '@mui/material/Button';
import { createLivros, getAutores } from '../../../services/APIservice';

// nome, genero, data_criacao, editora, qtd_disponivel, id_autor

const create = () => {

    const rageYear = /^\d{1,4}$/;
    const rageQuantidade = /^\d{1,2}$/;
    const rageLetras = /^[^a-zA-Z]*$/


    const [autores, setAutores] = useState([])

    function PegarAutores() {
        getAutores().then(data => {
            setAutores(data)
        console.log(data);
        })
    }

    const [nome, setName] = useState('')
    const [genero, setGenero] = useState('')
    const [data, setDate] = useState('')
    const [editora, setEditora] = useState('')
    const [quantidade, setQuantia] = useState('')
    const [autorId, setId] = useState('')

    useEffect(() => {
        PegarAutores()
    }, [])

    function Criar() {
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

        createLivros(nome, genero, data, editora, quantidade, autorId).then(data => {
            window.location.href = "/Adm/Livros"
        }).catch(err => console.log(err))
    }


    const showError = (message) => {
        const span = document.getElementById('span');
        span.textContent = message;
    }

    
    return (
        <div>
            <div className="header">
                <Sidebar />
                <div className="text">
                REGISTRAR LIVROS
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
            <Button variant="contained" color="success" onClick={Criar}>Enviar</Button>
            

            
        </div>
    )
}

export default create