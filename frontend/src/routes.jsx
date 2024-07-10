import { Route, Routes } from "react-router-dom";

//rotas dos administradores
import Users from "../src/pages/adm/users/users";
import Update from "../src/pages/adm/update_uers/update";
import Reclamacoes from "./pages/adm/reclamacoes/reclamacoes";
import Livros from "./pages/adm/livros/livros"
import CreateLivros from "./pages/adm/create_livros/create"
import UpdateLivros from "./pages/adm/update_livros/update"
import Autores from "./pages/adm/autores/autores"

//Rotas dos usuarios
import Create from "./pages/users/create/create"



function MainRoutes() {
  return (
    <Routes>
      {/* Adm routes */}
      <Route path="/Adm/Users" element={<Users />} />
      <Route path="/Adm/Atualizar/:cpf" element={<Update/>}/>
      <Route path="/Adm/Reclamacoes" element={<Reclamacoes/>}/>
      <Route path="/Adm/Livros" element={<Livros/>}/>
      <Route path="/Adm/Create_Livros" element={<CreateLivros/>}/>
      <Route path="/Adm/Atualizar_livros/:id" element={<UpdateLivros/>}/>
      <Route path="/Adm/Autores" element={<Autores/>}/>

      {/* User Routes */}
      <Route path="/Cadastro" element={<Create />} />
    </Routes>
  );
}

export default MainRoutes;