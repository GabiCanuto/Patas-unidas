const express = require('express');
const cors = require('cors');
const app = express();

// CORS configurado para aceitar requisições do seu frontend com credentials
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Usuários fixos para demonstração
const users = [
  {
    id: 1,
    nome: 'Admin',
    sobrenome: 'Master',
    email: 'admin@example.com',
    senha: 'admin123', // senha em texto puro só para demo!
    role: 'admin'
  },
  {
    id: 2,
    nome: 'Usuário',
    sobrenome: 'Comum',
    email: 'user@example.com',
    senha: 'user123',
    role: 'user'
  }
];

// Endpoint de login fake
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Busca usuário no array
  const user = users.find(
    u => u.email === email.trim().toLowerCase() && u.senha === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Falha na autenticação', message: 'Email ou senha incorretos' });
  }

  // Retorna dados simulando o backend real
  return res.json({
    user: {
      id: user.id,
      name: `${user.nome} ${user.sobrenome}`,
      email: user.email,
      role: user.role
    },
    token: 'fake-jwt-token-apresentacao'
  });
});

// Inicia o servidor
app.listen(4000, () => {
  console.log('Servidor de demonstração rodando em http://localhost:4000');
});

/*
  Como usar:
  1. Salve este arquivo como app-demo.js
  2. Rode: node app-demo.js
  3. Use normalmente sua tela de login com:
      admin@example.com / admin123
      user@example.com  / user123
  4. Não precisa de banco, seed, nem nada!
*/