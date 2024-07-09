import React from 'react'
import Sidebar from '../../../components/Drawer'
import './livros.css'
import Button from '@mui/material/Button';

import { getLivros } from '../../../services/APIservice'
import { useEffect, useState } from 'react'



const livros = () => {

    const [search, setSearch] = useState([])
    const [users, setUsers] = useState([])

    function getLivros() {

    }

    return (
        <div><div className="header">
            <Sidebar />
        </div>
            <div className="top">
                <input type="text" className="input" onChange={(e) => { setSearch(e.target.value) }} placeholder='pesquise um livro' />
                <Button variant="contained" color="success" onClick={getLivros} className='sucess' >Pesquisar</Button>
                <a href="/Adm/Create_Livros" className='cadastrarLivro' >Cadastrar livro</a>
            </div>
        </div>
    )
}

export default livros