import React from 'react'
import { createUser } from '../../../services/APIservice'
import Button from '@mui/material/Button';
import { useState } from 'react'
import Biblioteca from '../../../image/Biblioteca-cadastro.jpg'
import './create.css'
// cpf, nome, email, senha, telefone

import { TextField } from "@mui/material";

const create = () => {

    const [cpf, setCpf] = useState('')
    const [nome, setName] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmar, setConfirmar] = useState('')
    const [telefone, setTelefone] = useState('')

    function Criar() {
        if (senha != confirmar) {
            showError("Confirmar senha e senha tem que estar igual")
            return;
        }
        if (nome == '' || email == '' || senha == '' || telefone == '' || cpf == '') {
            showError('preencha todos os campos')
            return;
        }

        createUser(cpf, nome, email, senha, telefone).then(data => {
            if (data == "usuario ja foi cadastrado") {
                showError(data)
                return
            }
            // window.location.href = "/login"

        }).catch(err => console.log(err))
    }

    const showError = (message) => {
        const span = document.getElementById('span');
        span.textContent = message;
    }


    return (

        <div className="body">

            
        <div className='Aling'>
            <div className="row">
                <div className="col">
                    <TextField className="outlined-basic" label="CPF" variant="outlined" type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </div>
                <div className="col">
                    <TextField className="outlined-basic" label="Nome" variant="outlined" type="text" value={nome} onChange={(e) => setName(e.target.value)} />
                </div>
            </div>

            <div className="row">

                <div className="col">
                    <TextField className="outlined-basic" label="email" variant="outlined" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col">
                    <TextField className="outlined-basic" label="Senha" variant="outlined" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>

            </div>

            <div className="row">
                <div className="col">
                <TextField className="outlined-basic" label="Confirmar senha" variant="outlined" type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} />
                </div>

                <div className="col">
                    <TextField className="outlined-basic" label="Telefone" variant="outlined" type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                </div>
            
            </div>
            <span className='span aviso' id='span'></span>
            <Button variant="contained" color="success" onClick={Criar}>Enviar</Button>

        </div>

        <div className="images">
                <img src={Biblioteca} alt="imagem login bunitona"/>
            </div>
        </div>
    )
}

export default create