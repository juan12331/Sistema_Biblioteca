import React from 'react'
import Sidebar from '../../../components/Drawer'


import { useEffect, useState } from 'react'
import { getEmprestimosByCpf, getUsersByCpf } from '../../../services/APIservice'
import { useParams } from 'react-router-dom'


const emprestimoUpdate = () => {

  const { cpf } = useParams()

  const [emprestimoss, setEmprestimoss] = useState([])

  function sair() {
    localStorage.clear();
    window.location.href = "/Login"
  }

  let Cpf = localStorage.getItem('cpf')

    function verificar123 () {
      if (Cpf == null || Cpf == undefined) {
        window.location.href = '/login'
      }
      getUsersByCpf(Cpf).then(data => {
        if (data.papel == 'user'){
          window.location.href = "/Usuarios/LivrosUsers"
          return;
        } if (data.papel == 'adm') {
          return
        }
      })
    }


    function emprestimos() {
      getEmprestimosByCpf(cpf).then(data => {
        console.log(data[0].livros)
        setEmprestimoss(data[0].livros)
      })
    }
    useEffect(() => {
      verificar123()
      emprestimos()
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
    {emprestimoss.map(emprestimos => (
      <div className="div">
        {emprestimos.nome}
      </div>
    ))

    }
  </>
  )
}

export default emprestimoUpdate