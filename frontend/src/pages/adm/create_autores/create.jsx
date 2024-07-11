import React from 'react'
import Sidebar from '../../../components/Drawer';
import { useState } from 'react'
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import { createAutor } from '../../../services/APIservice';


const create = () => {

    const [nome, setName] = useState('')

    function criar() {
        if (nome == '') {
            showError('insira um nome valido')
            return
        } createAutor(nome).then(data => {
            console.log(data)
            voltar()
        }).catch(err => console.log(err))
    }

    function voltar() {
        window.location.href = '/Adm/Autores'
    }


    function sair() {
        window.location.href = "/Cadastro"
    }

    const showError = (message) => {
        const span = document.getElementById('span');
        span.textContent = message;
    }

    return (
        <>
            <div className="header">
                <Sidebar />
                <div className="text">
                    AUTORES
                </div>
                <button className='button1 delete' onClick={sair} >sair</button>
            </div>

            <div className="alinhar">
                <div className="row">
                    <input type="text" value={nome} onChange={(e) => setName(e.target.value)} placeholder='nome' className='textInputSozin' />
                </div>
            </div>
            <div className="row">
                <span className='span aviso' id='span'></span>
            </div>
            <div className="row">
                <Button variant="contained" startIcon={<SendIcon />} onClick={criar} className='button'>Enviar</Button>
                <div className="margin">
                    <Button variant="contained" color="error" startIcon={<CancelIcon />} onClick={voltar} className='button'>Cancelar</Button>
                </div>
            </div>


        </>
    )
}

export default create