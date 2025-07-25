// src/routes/auth.routes.js
const express = require('express');
const AuthController = require('../src/controllers/AuthController');
    // controllers/AuthController');
const { authenticateToken } = require('../middlewares/auth');

const router = express.Router();
const authController = new AuthController();

/**
 * @route POST /auth/login
 * @desc Autentica usuário e retorna token
 * @access Public
 */
router.post('/login', authController.authenticate);

/**
 * @route POST /auth/register  
 * @desc Registra novo usuário
 * @access Public
 */
router.post('/register', authController.register);

/**
 * @route POST /auth/logout
 * @desc Faz logout do usuário (remove cookie)
 * @access Private
 */
router.post('/logout', authenticateToken, authController.logout);

/**
 * @route GET /auth/me
 * @desc Retorna dados do usuário logado
 * @access Private
 */
router.get('/me', authenticateToken, (req, res) => {
  // req.user foi populado pelo middleware authenticateToken
  res.json({
    user: {
      id: req.user.id,
      role: req.user.role
    }
  });
});

module.exports = router;