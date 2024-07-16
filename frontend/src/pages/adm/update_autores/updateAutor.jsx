import React from 'react'
import Sidebar from '../../../components/Drawer';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import { updateAutores, getAutoresById } from '../../../services/APIservice';
import { getUsersByCpf } from '../../../services/APIservice'

const updateAutor = () => {

  const { id } = useParams()

  const [nome, setName] = useState('')

  function preencher(id){
    getAutoresById(id).then(data => {
      console.log(data)
      setName(data.autor)      
    }).catch(err => console.log(err))
  }


  function atualizar() {
    if (nome == '') {
        showError('insira um nome valido')
        return
    }
    console.log(id)
    updateAutores(id, nome).then(data => {
        voltar()
    }).catch(err => console.log(err))
}

  function voltar() {
    window.location.href = '/Adm/Autores'
}


function sair() {
  localStorage.clear();
  window.location.href = "/Login"
}

  const showError = (message) => {
    const span = document.getElementById('span');
    span.textContent = message;
}
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
  verificar123()
  preencher(id)
}, [])

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
                <Button variant="contained" startIcon={<SendIcon />} onClick={atualizar} className='button'>Atualizar</Button>
                <div className="margin">
                    <Button variant="contained" color="error" startIcon={<CancelIcon />} onClick={voltar} className='button'>Cancelar</Button>
                </div>
            </div>
    </>
  )
}

export default updateAutor