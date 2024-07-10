import React from 'react'
import Sidebar from '../../../components/Drawer'

const reclamacoes = () => {

  function sair() {
    window.location.href = "/Cadastro"
}

  return (
    <div className="header">
      <Sidebar/>
      <div className="text">
                RECLAMAÇÕES
            </div>
            <button className='button1 delete' onClick={sair} >sair</button>

    </div>
  )
}

export default reclamacoes