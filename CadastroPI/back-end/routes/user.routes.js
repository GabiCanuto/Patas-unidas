// src/routes/user.routes.js
const express = require('express');
const UserController = require('../src/controllers/UserController'); // ou UsuarioController, conforme seu arquivo
const { authenticateToken, authorizeRole, requireOwnerOrAdmin } = require('../middlewares/auth');

const router = express.Router();

/**
 * @route GET /users
 * @desc Lista todos os usuários
 * @access Private - Apenas Admin
 */
router.get('/',
  authenticateToken,           // Verifica se está logado
  authorizeRole('admin'),      // Verifica se é admin
  UserController.list          // Usa direto, pois exporta uma instância
);

/**
 * @route GET /users/:id
 * @desc Busca usuário por ID
 * @access Private - Próprio usuário ou Admin
 */
router.get('/:id',
  authenticateToken,
  requireOwnerOrAdmin('id'),   // Próprio usuário ou admin
  UserController.findById
);

/**
 * @route PUT /users/:id
 * @desc Atualiza usuário
 * @access Private - Próprio usuário ou Admin
 */
router.put('/:id',
  authenticateToken,
  requireOwnerOrAdmin('id'),
  UserController.update
);

/**
 * @route DELETE /users/:id
 * @desc Deleta usuário
 * @access Private - Apenas Admin
 */
router.delete('/:id',
  authenticateToken,
  authorizeRole('admin'),
  UserController.delete
);

module.exports = router;