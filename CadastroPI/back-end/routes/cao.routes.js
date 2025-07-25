// src/routes/cao.routes.js
const express = require('express');
const CaoController = require('../controllers/CaoController');
const router = express.Router();
const caoController = new CaoController();

router.get('/', caoController.listarTodos);
router.get('/disponiveis', caoController.listarDisponiveis);
router.get('/racas', caoController.listarRacas);
router.get('/buscar', caoController.buscarComFiltros);
router.get('/:id', caoController.buscarPorId);
router.post('/', caoController.cadastrar);
router.put('/:id', caoController.atualizar);
router.delete('/:id', caoController.deletar);
router.patch('/:id/adotar', caoController.marcarComoAdotado);

module.exports = router;