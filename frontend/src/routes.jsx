//importando biblioteca
import { Route, Routes } from "react-router-dom";

//rotas dos administradores
import Users from "../src/pages/adm/users/users";
import Update from "../src/pages/adm/update_users/update";
import Reclamacoes from "./pages/adm/reclamacoes/reclamacoes";
import Livros from "./pages/adm/livros/livros"
import CreateLivros from "./pages/adm/create_livros/create"
import UpdateLivros from "./pages/adm/update_livros/update"
import Autores from "./pages/adm/autores/autores"
import UpdateAutor from "./pages/adm/update_autores/updateAutor"
import CreateAutores from "./pages/adm/create_autores/create"
import ViewReclamacoes from "./pages/adm/view_reclamacoes/relamacoes"

//Rotas dos usuarios
import Create from "./pages/users/create/create"
import Login from "./pages/users/login/login"
import Homepage from "./pages/users/homepage/homepage"

// FIX: adicionar obrigatoriadoredade de token nas rotas


function MainRoutes() {
  return (
    <Routes>
      {/* Adm routes */}
      <Route path="/Adm/Users" element={<Users />} />
      <Route path="/Adm/Atualizar/:cpf" element={<Update />} />
      <Route path="/Adm/Reclamacoes" element={<Reclamacoes />} />
      <Route path="/Adm/Livros" element={<Livros />} />
      <Route path="/Adm/Create_Livros" element={<CreateLivros />} />
      <Route path="/Adm/Atualizar_livros/:id" element={<UpdateLivros />} />
      <Route path="/Adm/Autores" element={<Autores />} />
      <Route path="/Adm/Atualizar_autor/:id" element={<UpdateAutor />} />
      <Route path="/Adm/Cadastrar_autor" element={<CreateAutores />} />
      <Route path="/Adm/ViewReclamacoes/:id" element={<ViewReclamacoes />} />


      {/* User Routes */}
      <Route path="/Cadastro" element={<Create />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Homepage" element={<Homepage />} />
    </Routes>
  );
}

export default MainRoutes;