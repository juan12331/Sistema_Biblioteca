import React from 'react'
import Sidebar from '../../../components/Drawer'


const livros = () => {

    const [autores, setAutores2] = useState([
        {
            "id_autor": 1,
            "autor": "George Orwell",
            "createdAt": "2024-07-08T20:15:39.000Z",
            "updatedAt": "2024-07-08T20:15:39.000Z"
        }
    ])
    return (
        <div><div className="header">
            <Sidebar />
        </div>
        <a href="/Adm/Create_Livros">Cadastre um livro</a>
        </div>
    )
}

export default livros