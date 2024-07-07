import { Route, Routes } from "react-router-dom";
import Users from "../src/pages/adm/users/users";
// import Create from "./pages/create_users/create";
import Update from "../src/pages/adm/update_uers/update";
// import Login from "./pages/login_adm/login"
import Reclamacoes from "./pages/adm/reclamacoes/reclamacoes";
import Create from "./pages/users/create/create"



function MainRoutes() {
  return (
    <Routes>
      {/* Adm routes */}
      <Route path="/Adm/Users" element={<Users />} />
      <Route path="/Adm/Atualizar/:cpf" element={<Update/>}/>
      <Route path="/Adm/Reclamacoes" element={<Reclamacoes/>}/>

      {/* User Routes */}
      <Route path="/Cadastro" element={<Create />} />
    </Routes>
  );
}

export default MainRoutes;