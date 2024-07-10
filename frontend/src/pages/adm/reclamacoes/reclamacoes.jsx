import React from 'react'
import Sidebar from '../../../components/Drawer'

const reclamacoes = () => {
  return (
    <div className="header">
      <Sidebar/>
      <div className="text">
                RECLAMAÇÕES
            </div>
            <button className='button1 delete' >sair</button>

    </div>
  )
}

export default reclamacoes