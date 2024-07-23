import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Sidebar from '../../../components/Drawer'
import { useEffect } from 'react';
import { getUsersByCpf, getAllEmprestimos } from '../../../services/APIservice'
import './emprestimos_livros.css'



const emprestimos_livros = () => {

  const [pesquisa, setPesquisa] = useState('')
  const [Emprestimos, setEmprestimos] = useState([])


  function getEmprestimos() {
    getAllEmprestimos({ cpf: pesquisa, nome: pesquisa }).then(data => {
      console.log(data)
      setEmprestimos(data)
    }).catch(err => console.log("deu erro :(", err))
  }

  function sair() {
    localStorage.clear();
    window.location.href = "/Login"
  }

  let cpf = localStorage.getItem('cpf')

  function verificar123() {
    if (cpf == null || cpf == undefined) {
      window.location.href = '/login'
    }
    getUsersByCpf(cpf).then(data => {
      if (data.papel == 'user') {
        window.location.href = "/Usuarios/LivrosUsers"
        return;
      } if (data.papel == 'adm') {
        return
      }
    })
  }

  useEffect(() => {
    verificar123()
    getEmprestimos()
  }, [])

  return (
    <>
      <div className="header">
        <Sidebar />
        <div className="text">
          Emprestimos de Livros
        </div>
        <button className='button1 delete' onClick={sair} >sair</button>
      </div>
      <div className="top">
        <input type="text" className="input" setPesquisa={(e) => setPesquisa(e.target.value)} />
        <Button variant="contained" color="success" className='sucess' onClick={getEmprestimos} >Pesquisar</Button>
      </div>
      <div className="cardWrap">
        {Emprestimos.map((emprestimo) => (
          <div className='card' key={emprestimo.id}>
            <div className="nome">
              {emprestimo.nome}
            </div>
            <div className="genero">
              Cpf: {emprestimo.cpf}
            </div>
            {emprestimo.livros.map(livros => (
              <>
              <div className="telefone">
                {livros.nome}
              </div>
              <div className="genero">
        Status: {livros.emprestimos.status}
      </div>
      </>
            ))

            }

            

            <button value={emprestimo.id} id='delete' className='button1 delete' > Cancelar/Devolver </button>
            <button value={emprestimo.id} id='edit' className='button1 edit' > Editar </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default emprestimos_livros