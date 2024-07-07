import http from "./http"

export async function getUsers(params) {
    const response = await http.get('/usuarios');
    return response.data;
}

export async function login(email, senha) {
    const response = await http.post('/login', { email, senha });
    return response.data;
}

export async function createUser(cpf, nome, email, senha, telefone) {
    const response = await http.post('/usuarios', { cpf: cpf, nome: nome, email: email, senha: senha, telefone: telefone })
    return response.data
}

export async function deleteUser(cpf) {
    const response = await http.delete(`/usuarios/${cpf}`)
    return;
}

export async function updateUser(cpf, nome, email, senha, papel, telefone) {
    const response = await http.put(`/usuarios/${cpf}`, {nome, email, senha, papel, telefone})
    return
}