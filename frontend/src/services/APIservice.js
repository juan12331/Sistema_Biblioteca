import http from "./http"


//funções usuarios

export async function getUsers(params) {
    const response = await http.get('/usuarios', { params });
    return response.data;
}

export async function getUsersByCpf(cpf) {
    const response = await http.get(`/usuarios/${cpf}`);
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
    console.log(cpf, nome, email, senha, papel, telefone);
    const response = await http.put(`/usuarios/${cpf}`, { nome: nome, email: email, senha: senha, papel: papel, telefone: telefone })
    return console.log(response.data);
}


//Funções de livros

export async function createLivros(nome, genero, data_criacao, editora, qtd_disponivel, id_autor) {
    const response = await http.post('/livros', { nome: nome, genero: genero, data_criacao: data_criacao, editora: editora, qtd_disponivel: qtd_disponivel, id_autor: id_autor })
    return response.data;
}



//funções dos autores

export async function getAutores(params) {
    const response = await http.get('/autores', { params })
    return response.data
}

//funções dos livros

export async function getLivros(params) {
    const response = await http.get('/livros', {params})
    return response.data;
}

export async function deleteLivros(id) {
    const response = await http.delete(`/livros/${id}`)
    return
}