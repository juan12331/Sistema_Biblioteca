import React from 'react'
import Sidebar from '../../../components/Drawer';


const autores = () => {

    function sair() {
        window.location.href = "/Cadastro"
    }
    
  return (
    <>
            <div className="header">
                <Sidebar />
                <div className="text">
                    AUTORES
                </div>
                <button className='button1 delete' onClick={sair} >sair</button>

            </div>
</>
  )
}

export default autores