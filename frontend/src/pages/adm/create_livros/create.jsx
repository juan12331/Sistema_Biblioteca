import { useEffect, useState } from 'react'
import React from 'react'
import Sidebar from '../../../components/Drawer';
import Button from '@mui/material/Button';
import { createLivros, getAutores } from '../../../services/APIservice';

// nome, genero, data_criacao, editora, qtd_disponivel, id_autor

const create = () => {

    const [autores, setAutores2] = useState([
        {
            "id_autor": 1,
            "autor": "George Orwell",
            "createdAt": "2024-07-08T20:15:39.000Z",
            "updatedAt": "2024-07-08T20:15:39.000Z"
        }
    ])

    function getAutores1() {
        getAutores().then(data => {
            setAutores2(data)
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
        console.log(autores);
        // getAutores1()
        console.log(autores)
    }, [])

    function Criar() {
        console.log(autores)
        if (nome == '' || genero == '' || data == '' || quantidade == '' || autorId == '') {
            showError('preencha todos os campos')
            return;
        }

        createLivros(nome, genero, data, editora, quantidade, autorId).then(data => {
            
            if (data == "livro ja existe") {
                showError(data)
                return
            }
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
            </div>

            <input type="text" value={nome} onChange={(e) => setName(e.target.value)} placeholder='nome' />
            <input type="text" value={genero} onChange={(e) => setGenero(e.target.value)} placeholder='genero' />
            <input type="text" value={data} onChange={(e) => setDate(e.target.value)} placeholder='Ano' />
            <input type="text" value={editora} onChange={(e) => setEditora(e.target.value)} placeholder='editora' />
            <input type="Number" value={quantidade} onChange={(e) => setQuantia(e.target.value)} placeholder='quantidade' />
            <select value={autorId} onChange={(e) => setId(e.target.value)} className='select'>
                <option value="">Selecione</option>
                {autores.map((autor) => {
                    <option value={autor.id_autor}>{autor.autor}</option>
                })

                }
            </select>
            <span className='span aviso' id='span'></span>
            <Button variant="contained" color="success" onClick={Criar}>Enviar</Button>
            {autores.map((autor => {
             {autor.autor}
             {autor.id_autor}
            }))

            }
        </div>
    )
}

export default create