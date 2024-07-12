import React, { useState } from 'react'
import { createUser } from '../../../services/APIservice'
import Button from '@mui/material/Button';
import Biblioteca from '../../../image/Biblioteca-cadastro.jpg'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import './create.css'

import { TextField } from "@mui/material";

const create = () => {
    const rageEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const rageSenha = /^(?=.*[A-Z])(?=.*\d).+$/;
    const rageCaracter = /^.{8,}$/;
    const regexMaisDe14Caracteres = /^.{15,}$/


    const [cpf, setCpf] = useState('')
    const [nome, setName] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmar, setConfirmar] = useState('')
    const [telefone, setTelefone] = useState('')

    function formatCPF(cpf) {
        // Limpa todos os caracteres não numéricos
        cpf = cpf.replace(/\D/g, '');

        // Formatação do CPF
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    function formatPhoneNumber(phoneNumber) {
        // Limpa todos os caracteres não numéricos
        phoneNumber = phoneNumber.replace(/\D/g, '');

        // Formatação do número de acordo com o padrão desejado
        if (phoneNumber.length === 11) {
            return phoneNumber.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
        } else if (phoneNumber.length === 10) {
            return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else {
            return phoneNumber;
        }
    }

    function Criar() {
        if (senha != confirmar) {
            showError("Confirmar senha e senha tem que estar igual")
            return;
        }
        if (nome == '' || email == '' || senha == '' || telefone == '' || cpf == '') {
            showError('preencha todos os campos')
            return;
        }
        if (!rageEmail.test(email)) {
            showError('Email invalido')
            return;
        } if (!rageSenha.test(senha)) {
            showError('Senha fraca, coloque numeros e letras maiusculas')
            return;
        } if (!rageCaracter.test(senha)) {
            showError('senha precisa no minimo de 8 caracteres')
            return
        } if (regexMaisDe14Caracteres.test(cpf)) {
            showError('Cpf incorreto')
            return
        } if (regexMaisDe14Caracteres.test(telefone)) {
            showError('telefone não suportado/incorreto')
            return
        }

        createUser(cpf, nome, email, senha, telefone).then(data => {

            // window.location.href = "/login"

        }).catch(err => console.log(err))
    }

    const showError = (message) => {
        const span = document.getElementById('span');
        span.textContent = message;
    }


    return (
        <div className="container">
            <span className='back' onClick={() => window.history.back()}>
                <ChevronLeftIcon /> <span>Voltar</span>
            </span>
            <div className="register">
                <h1 className="title">
                    Cadastra-se na biblioteca
                </h1>

                <form>
                    <div className="row">
                        <TextField className='textField' label="CPF" variant="outlined" type="text" value={cpf} onChange={(e) => setCpf(formatCPF(e.target.value))} />
                        <TextField className='textField' label="Nome" variant="outlined" type="text" value={nome} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="row">
                        <TextField className='textField' label="email" variant="outlined" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField className='textField' label="Senha" variant="outlined" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </div>
                    <div className="row">
                        <TextField className='textField' label="Confirmar senha" variant="outlined" type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} />
                        <TextField className='textField' label="Telefone" variant="outlined" type="text" value={telefone} onChange={(e) => setTelefone(formatPhoneNumber(e.target.value))} />
                    </div>
                    <div className="row">
                        <span className='error' id='span'></span>
                    </div>
                    <div className="row">
                        <Button variant="contained" color="success" onClick={Criar} >Cadastrar</Button>
                    </div>
                    <div className="row">
                        <Button className='login' variant="text" onClick={Criar} >Já tenho uma conta</Button>
                    </div>
                </form>
            </div>
            <div className="image">
                <img src={Biblioteca} alt="imagem login bunitona" />
            </div>
        </div>
    )
}

export default create