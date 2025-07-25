// src/controllers/AuthController.js
const AuthService = require('../../services/AuthService');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Endpoint de login - autentica usuário e retorna token
   * @param {Request} req - Request do Express
   * @param {Response} res - Response do Express
   */
  authenticate = async (req, res) => {
    try {
      console.log('🔍 AuthController - Tentativa de login:', req.body.email);

      // ✅ CORREÇÃO: Aceita tanto 'password' quanto 'senha' do frontend
      // Isso garante compatibilidade com diferentes implementações
      const { email, password, senha } = req.body;
      const userPassword = password || senha;

      // Validação básica dos campos obrigatórios
      if (!email || !userPassword) {
        return res.status(400).json({ 
          error: 'Campos obrigatórios',
          message: 'Email e senha são obrigatórios' 
        });
      }

      // Chama o serviço de autenticação
      const { user, token } = await this.authService.authenticate({
        email: email.trim().toLowerCase(), // Normaliza o email
        password: userPassword,
      });

      // ✅ Configura cookie HTTP-only para segurança
      // httpOnly: true - não acessível via JavaScript (proteção XSS)
      // secure: true - apenas HTTPS em produção
      // sameSite: 'strict' - proteção contra CSRF
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000, // 1 hora em milissegundos
        sameSite: 'strict'
      });

      console.log('✅ AuthController - Login realizado:', user.email, 'Role:', user.role);

      // ✅ CORREÇÃO: Retorna tanto user quanto token
      // Frontend precisa do token para localStorage e do role para redirecionamento
      return res.status(200).json({ 
        user,
        token, // Frontend precisa do token
        message: 'Login realizado com sucesso'
      });

    } catch (error) {
      console.error('❌ AuthController - Erro no login:', error.message);
      
      // Retorna erro padronizado
      return res.status(401).json({ 
        error: 'Falha na autenticação',
        message: error.message 
      });
    }
  }

  /**
   * Endpoint de registro - cria novo usuário
   */
  register = async (req, res) => {
    try {
      console.log('🔍 AuthController - Tentativa de registro:', req.body.email);

      const userData = req.body;
      const newUser = await this.authService.register(userData);

      console.log('✅ AuthController - Usuário registrado:', newUser.email);

      return res.status(201).json({
        user: newUser,
        message: 'Usuário registrado com sucesso'
      });

    } catch (error) {
      console.error('❌ AuthController - Erro no registro:', error.message);
      
      return res.status(400).json({
        error: 'Falha no registro',
        message: error.message
      });
    }
  }

  /**
   * Endpoint de logout - remove cookie do token
   */
  logout = async (req, res) => {
    try {
      console.log('🔍 AuthController - Logout do usuário:', req.user?.id);

      // Remove o cookie do token
      res.clearCookie('token');
      
      return res.status(200).json({ 
        message: 'Logout realizado com sucesso' 
      });

    } catch (error) {
      console.error('❌ AuthController - Erro no logout:', error.message);
      
      return res.status(500).json({
        error: 'Erro interno',
        message: 'Erro ao fazer logout'
      });
    }
  }
}

module.exports = AuthController;