import Sidebar from '../../../components/Drawer'

import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { updateUser, getUsersByCpf } from '../../../services/APIservice';
import Button from '@mui/material/Button';
import './update.css'

//cpf, nome, email, senha, papel, telefone

const update = () => {

  const rageEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const rageSenha = /^(?=.*[A-Z])(?=.*\d).+$/;
  const rageCaracter =  /^.{8,}$/;

  const { cpf } = useParams()

  const [nome, setName] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [telefone, setTelefone] = useState('')
  const [papel, setPapel] = useState('')



  function preencher(cpf){
    getUsersByCpf(cpf).then(data => {
      console.log(data)
      setName(data.nome)
      setEmail(data.email)
      setPapel(data.papel)
      setSenha(data.senha)
      setTelefone(data.telefone)

      
              
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


function Atualizar(){

  if( nome == '' || email == '' || senha == '' || telefone == ''){
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


  return (
    <>
    <div className="header">
      <Sidebar/>
      <div className="text">
                ATUALIZAR USUARIOS
            </div>
            <span></span>

    </div>
    
    <div>
    <div className='Aling'>
            <div className="row">
                
                <div className="col">
                    <input className="outlined-basic" label="Nome" variant="outlined" type="text" value={nome} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="col">
                      <input type="text" label='telefone' value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                </div>
            </div>

            <div className="row">

                <div className="col">
                    <input className="outlined-basic" label="email" variant="outlined" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="col">
                    <input className="outlined-basic" label="Senha" variant="outlined" type="text" value={senha} onChange={(e) => setSenha(e.target.value)} />
                </div>

            </div>

            <select value={papel} onChange={(e) => setPapel(e.target.value)} className='select'>
                  <option value="user">user</option>
                  <option value="adm">adm</option>
                </select>
            <span className='span aviso' id='span'></span>
            <Button variant="contained" color="success" onClick={Atualizar}>Enviar</Button>

        </div>
    </div>
    </>
  )
}

export default update