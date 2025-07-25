// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa a instância do Express configurada em app.js
const app = require('./app');

// Define a porta do servidor (usa a variável PORT do .env ou 4000 como padrão)
const PORT = process.env.PORT || 4000;

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Frontend: http://localhost:5173`);
  console.log(`🔗 API: http://localhost:${PORT}`);
  console.log(`🔐 Login: http://localhost:${PORT}/auth/login`);
});