import React, { useState } from 'react'
import { loginUser } from '../../../services/APIservice'
import Button from '@mui/material/Button';
import Biblioteca from '../../../image/Biblioteca-login.jpg'
import { TextField } from "@mui/material";
import './login.css'

const login = () => {

  const rageEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const rageSenha = /^(?=.*[A-Z])(?=.*\d).+$/;
    


    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')


    function Logar() {
      if (email == '' || senha == '') {
          showError('preencha todos os campos')
          return;
      }
      

      loginUser(email, senha).then(data => {
        if (data.email == email && data.senha == senha) {
          console.log(data.papel)
          if (data.papel === 'user') {
            window.location.href = '/Homepage'
            return;
          }
          window.location.href = '/Adm/Users'
        }
      }).catch(err => console.log(err))
  }

    const showError = (message) => {
        const span = document.getElementById('span');
        span.textContent = message;
    }

    function cadastro() {
      window.location.href = '/cadastro'
    }

    
  return (
  <div className="registerContainer">
    <div className="register">
                <h1 className="logar">
                    Login
                </h1>

                <form>
                    
                    <div className="row">
                        
                        <TextField className='textField' label="email" variant="outlined" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="row">
                        <TextField className='textField' label="Senha" variant="outlined" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </div>
                    
                    <div className="row">
                        <span className='error' id='span'></span>
                    </div>
                    <div className="row">
                        <Button variant="contained" color="success" onClick={Logar} >Logar</Button>
                    </div>
                    <div className="row">
                        <Button className='login' variant="text" onClick={cadastro} >Não tenho uma conta </Button>
                    </div>
                </form>
            </div>
            <div className="image">
                <img src={Biblioteca} alt="imagem login bunitona" />
            </div>
        </div>
  )
}

export default login