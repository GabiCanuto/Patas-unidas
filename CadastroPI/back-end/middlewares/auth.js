// src/middlewares/auth.js
const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticação - verifica se usuário está logado
 * Extrai o token JWT e valida, salvando dados do usuário em req.user
 * @param {Request} req - Request do Express
 * @param {Response} res - Response do Express  
 * @param {NextFunction} next - Função next do Express
 */
function authenticateToken(req, res, next) {
  console.log('🔍 Middleware - Verificando autenticação');

  // Tenta pegar o token do cookie primeiro, depois do header Authorization
  const tokenFromCookie = req.cookies?.token;
  const tokenFromHeader = req.headers['authorization']?.split(' ')[1]; // "Bearer TOKEN"
  const token = tokenFromCookie || tokenFromHeader;

  if (!token) {
    console.log('❌ Middleware - Token não encontrado');
    return res.status(401).json({ 
      error: 'Token não encontrado',
      message: 'Você precisa estar logado para acessar este recurso' 
    });
  }

  try {
    // Verifica e decodifica o token JWT
    const secret = process.env.JWT_SECRET || 'fallback_secret_key';
    const decoded = jwt.verify(token, secret);

    // ✅ CORREÇÃO: Extrai tanto o ID (sub) quanto o role do token
    // Isso é essencial para o sistema de autorização funcionar
    const userId = parseInt(decoded.sub);
    const userRole = decoded.role || 'user'; // Default para 'user'

    // ✅ Salva dados do usuário no request para uso nas rotas
    req.user = {
      id: userId,
      role: userRole,
    };

    console.log('✅ Middleware - Usuário autenticado:', userId, 'Role:', userRole);
    return next();

  } catch (error) {
    console.error('❌ Middleware - Token inválido:', error.message);
    
    return res.status(401).json({ 
      error: 'Token inválido',
      message: 'Seu token de acesso é inválido ou expirou' 
    });
  }
}

/**
 * Middleware de autorização - verifica se usuário tem permissão
 * Deve ser usado APÓS o authenticateToken
 * @param {string} requiredRole - Role necessário para acessar a rota
 * @returns {Function} - Middleware function
 */
function authorizeRole(requiredRole) {
  return (req, res, next) => {
    console.log('🔍 Middleware - Verificando autorização para role:', requiredRole);

    // Verifica se o usuário foi autenticado primeiro
    if (!req.user) {
      console.log('❌ Middleware - Usuário não autenticado');
      return res.status(401).json({ 
        error: 'Usuário não autenticado',
        message: 'Você precisa estar logado' 
      });
    }

    const userRole = req.user.role;

    // ✅ Verifica se o usuário tem o role necessário
    // Admin sempre tem acesso a tudo
    if (userRole !== requiredRole && userRole !== 'admin') {
      console.log('❌ Middleware - Permissão insuficiente. User role:', userRole, 'Required:', requiredRole);
      
      return res.status(403).json({ 
        error: 'Permissão insuficiente',
        message: `Você precisa ser ${requiredRole} para acessar este recurso` 
      });
    }

    console.log('✅ Middleware - Autorização concedida para:', userRole);
    return next();
  };
}

/**
 * Middleware que verifica se usuário é admin
 * Atalho para authorizeRole('admin')
 */
function requireAdmin(req, res, next) {
  return authorizeRole('admin')(req, res, next);
}

/**
 * Middleware que verifica se usuário é o próprio ou admin
 * Útil para rotas como /users/:id onde usuário pode ver seus próprios dados
 * @param {string} paramName - Nome do parâmetro que contém o ID (default: 'id')
 */
function requireOwnerOrAdmin(paramName = 'id') {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const resourceId = parseInt(req.params[paramName]);
    const userId = req.user.id;
    const userRole = req.user.role;

    // Admin sempre pode acessar, ou se for o próprio usuário
    if (userRole === 'admin' || userId === resourceId) {
      return next();
    }

    return res.status(403).json({ 
      error: 'Permissão insuficiente',
      message: 'Você só pode acessar seus próprios dados' 
    });
  };
}

module.exports = {
  authenticateToken,
  authorizeRole,
  requireAdmin,
  requireOwnerOrAdmin
};