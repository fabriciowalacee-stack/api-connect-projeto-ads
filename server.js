const express = require('express');
const app = express();

app.use(express.json());

let users = [
  { id: 1, nome: "Carlos Silva", email: "carlos@email.com", cargo: "Desenvolvedor" },
  { id: 2, nome: "Mariana Costa", email: "mariana@email.com", cargo: "Designer" }
];

// 1. GET /users - Listar todos
app.get('/users', (req, res) => {
  return res.status(200).json({ sucesso: true, total: users.length, dados: users });
});

// 2. GET /users/:id - Buscar por ID (404 se não existir)
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ sucesso: false, mensagem: `Usuário com o ID ${id} não foi encontrado.` });
  }

  return res.status(200).json({ sucesso: true, dados: user });
});

// 3. POST /users - Criar usuário (com validações e retorno 201 ou 400)
app.post('/users', (req, res) => {
  const { nome, email, cargo } = req.body;

  if (!nome || typeof nome !== 'string' || nome.trim() === '') {
    return res.status(400).json({ status: 'fail', error: 'O campo "nome" é obrigatório e deve ser um texto válido.' });
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ status: 'fail', error: 'O campo "email" é obrigatório e deve conter um formato de e-mail válido.' });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    nome: nome.trim(),
    email: email.trim().toLowerCase(),
    cargo: cargo ? cargo.trim() : 'Não informado'
  };

  users.push(newUser);

  return res.status(201).json({ status: 'success', data: newUser });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});