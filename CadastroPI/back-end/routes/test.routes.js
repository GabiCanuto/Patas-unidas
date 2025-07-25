const express = require('express');
const router = express.Router();
const CaoController = require('../src/controllers/DogController');

// Middleware fake que simula usuário admin logado
function fakeAdminUser(req, res, next) {
  req.user = {
    id_usuario: 1,  // id do usuário admin que você quer testar
    role: 2          // role 2 = admin
  };
  next();
}

// Rota de teste para criar cachorro sem precisar de token
router.post('/caes/test', fakeAdminUser, CaoController.create);

module.exports = router;