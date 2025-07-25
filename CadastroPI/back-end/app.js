const express = require('express');
const caoRoutes = require('./src/routes/cao.routes');
const app = express();

app.use(express.json());
app.use('/api/caes', caoRoutes);

// ...outras rotas

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});