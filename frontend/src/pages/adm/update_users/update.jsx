import Sidebar from '../../../components/Drawer'

import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { updateUser, getUsersByCpf } from '../../../services/APIservice';
import Button from '@mui/material/Button';
import './update.css'

import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';

//cpf, nome, email, senha, papel, telefone

const update = () => {

  const rageEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const rageSenha = /^(?=.*[A-Z])(?=.*\d).+$/;
  const rageCaracter = /^.{8,}$/;

  const { cpf } = useParams()

  const [nome, setName] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [telefone, setTelefone] = useState('')
  const [papel, setPapel] = useState('')


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



  function preencher(cpf) {
    getUsersByCpf(cpf).then(data => {
      const newTelefone =  formatPhoneNumber(data.telefone)
      setName(data.nome)
      setEmail(data.email)
      setPapel(data.papel)
      setSenha(data.senha)
      setTelefone(newTelefone)



    }).catch(err => console.log(err))
  }

  const showError = (message) => {
    const span = document.getElementById('span');
    span.textContent = message;
    console.error(message)
  }

  function Voltar() {
    window.location.href = '/Adm/Users'
  }


  function Atualizar() {

    if (nome == '' || email == '' || senha == '' || telefone == '') {
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
    }
    updateUser(cpf, nome, email, senha, papel, telefone)
    Voltar()
  }

  useEffect(() => {
    preencher(cpf)
  }, [])

  function sair() {
    window.location.href = "/Cadastro"
  }

  function voltar() {
    window.location.href = '/Adm/Users'
  }


  return (
    <>
      <div className="header">
        <Sidebar />
        <div className="text">
          ATUALIZAR USUARIOS
        </div>
        <button className='button1 delete' onClick={sair} >sair</button>

      </div>

      <div>
        <div className='Aling'>
          <div className="rowTop">

          
            <input type="text" className='InputText' value={nome} onChange={(e) => setName(e.target.value)} />


            <input type="text" className='InputText' value={telefone} onChange={(e) => setTelefone(formatPhoneNumber(e.target.value))} />

          </div>

          <div className="rowTop">


            <input className='InputText' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

            <input className='InputText' type="text" value={senha} onChange={(e) => setSenha(e.target.value)} />


          </div>  

          <select value={papel} onChange={(e) => setPapel(e.target.value)} className='select'>
            <option value="user">user</option>
            <option value="adm">adm</option>
          </select>
          <span className='span aviso' id='span'></span>
          <Button variant="contained" color="success" startIcon={<SendIcon/>} onClick={Atualizar}>Enviar</Button>
          <Button variant="contained" color="error" startIcon={<CancelIcon />} onClick={voltar} className='button'>Cancelar</Button>
        </div>
      </div>
    </>
  )
}

export default update