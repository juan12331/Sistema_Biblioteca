import { Route, Routes } from "react-router-dom";
import Users from "../src/pages/adm/users/users";
// import Create from "./pages/create_users/create";
import Update from "../src/pages/adm/update_uers/update";
// import Login from "./pages/login_adm/login"



function MainRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/Users" element={<Users />} />
      {/* <Route path="/Criar" element={<Create/>} /> */}
      <Route path="/Atualizar/:cpf" element={<Update/>}/>
    </Routes>
  );
}

export default MainRoutes;