// data/userDatabase.js - Simulação de banco de dados usando localStorage

/**
 * Classe para gerenciar usuários no localStorage
 * Simula operações básicas de CRUD para usuários
 * Utiliza as melhores práticas de JavaScript e validação de dados
 */
class UserDatabase {
  constructor() {
    this.storageKey = 'patas_unidas_users';
    this.currentUserKey = 'patas_unidas_current_user';
    this.initializeDatabase();
  }

  /**
   * Inicializa o banco com usuários padrão se não existir
   * Cria usuários de exemplo para facilitar os testes
   */
  initializeDatabase() {
    const users = this.getAllUsers();
    if (users.length === 0) {
      // Usuários padrão para teste - facilita o desenvolvimento
      const defaultUsers = [
        {
          id: 1,
          name: 'Administrador',
          email: 'admin@patasunidas.com',
          password: '123456',
          role: 'admin',
          createdAt: new Date().toISOString(),
          isActive: true
        },
        {
          id: 2,
          name: 'Gabriela Eduarda',
          email: 'gabi@gmail.com',
          password: '123456',
          role: 'user',
          createdAt: new Date().toISOString(),
          isActive: true
        },
        {
          id: 3,
          name: 'Maria Santos',
          email: 'maria@email.com',
          password: 'maria123',
          role: 'user',
          createdAt: new Date().toISOString(),
          isActive: true
        }
      ];
      
      // Salva os usuários padrão no localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(defaultUsers));
      console.log('Banco de usuários inicializado com dados padrão');
    }
  }

  /**
   * Retorna todos os usuários cadastrados
   * @returns {Array} Lista de todos os usuários
   */
  getAllUsers() {
    try {
      const users = localStorage.getItem(this.storageKey);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      return [];
    }
  }

  /**
   * Busca usuário por email (case-insensitive)
   * @param {string} email - Email do usuário
   * @returns {Object|null} Usuário encontrado ou null
   */
  findUserByEmail(email) {
    if (!email || typeof email !== 'string') {
      return null;
    }
    
    const users = this.getAllUsers();
    return users.find(user => 
      user.email.toLowerCase().trim() === email.toLowerCase().trim()
    );
  }

  /**
   * Busca usuário por ID
   * @param {number} id - ID do usuário
   * @returns {Object|null} Usuário encontrado ou null
   */
  findUserById(id) {
    if (!id || typeof id !== 'number') {
      return null;
    }
    
    const users = this.getAllUsers();
    return users.find(user => user.id === id);
  }

  /**
   * Valida formato de email
   * @param {string} email - Email para validar
   * @returns {boolean} True se válido
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valida login do usuário
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Object} Resultado da validação
   */
  validateLogin(email, password) {
    // Validações básicas de entrada
    if (!email || !password) {
      return { 
        success: false, 
        message: 'Email e senha são obrigatórios' 
      };
    }

    if (!this.isValidEmail(email)) {
      return { 
        success: false, 
        message: 'Formato de email inválido' 
      };
    }
    
    const user = this.findUserByEmail(email);
    
    // Verifica se usuário existe
    if (!user) {
      return { 
        success: false, 
        message: 'Usuário não encontrado. Verifique seu email.' 
      };
    }

    // Verifica se usuário está ativo
    if (!user.isActive) {
      return { 
        success: false, 
        message: 'Conta desativada. Entre em contato com o suporte.' 
      };
    }
    
    // Verifica senha
    if (user.password !== password) {
      return { 
        success: false, 
        message: 'Senha incorreta. Tente novamente.' 
      };
    }
    
    // Login bem-sucedido
    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role || 'user',
      loginAt: new Date().toISOString()
    };

    // Salva informações do usuário logado
    this.setCurrentUser(userInfo);
    
    return { 
      success: true, 
      message: 'Login realizado com sucesso!',
      user: userInfo
    };
  }

  /**
   * Cadastra novo usuário
   * @param {Object} userData - Dados do usuário
   * @returns {Object} Resultado do cadastro
   */
  registerUser(userData) {
    const { name, email, password, confirmPassword } = userData;
    
    // Validações básicas de entrada
    if (!name || !email || !password) {
      return { 
        success: false, 
        message: 'Nome, email e senha são obrigatórios' 
      };
    }

    // Validação de nome
    if (name.trim().length < 2) {
      return { 
        success: false, 
        message: 'Nome deve ter pelo menos 2 caracteres' 
      };
    }

    // Validação de email
    if (!this.isValidEmail(email)) {
      return { 
        success: false, 
        message: 'Formato de email inválido' 
      };
    }
    
    // Validação de senha
    if (password.length < 6) {
      return { 
        success: false, 
        message: 'A senha deve ter pelo menos 6 caracteres' 
      };
    }

    // Validação de confirmação de senha (se fornecida)
    if (confirmPassword && password !== confirmPassword) {
      return { 
        success: false, 
        message: 'As senhas não coincidem' 
      };
    }
    
    // Verifica se email já existe
    if (this.findUserByEmail(email)) {
      return { 
        success: false, 
        message: 'Este email já está cadastrado. Tente fazer login.' 
      };
    }
    
    try {
      // Cria novo usuário
      const users = this.getAllUsers();
      const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password,
        role: 'user', // Usuários novos sempre começam como 'user'
        createdAt: new Date().toISOString(),
        isActive: true
      };
      
      users.push(newUser);
      localStorage.setItem(this.storageKey, JSON.stringify(users));
      
      console.log('Novo usuário cadastrado:', { id: newUser.id, email: newUser.email });
      
      return { 
        success: true, 
        message: 'Usuário cadastrado com sucesso!',
        user: { 
          id: newUser.id, 
          name: newUser.name, 
          email: newUser.email,
          role: newUser.role
        }
      };
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      return { 
        success: false, 
        message: 'Erro interno. Tente novamente.' 
      };
    }
  }

  /**
   * Define o usuário atual logado
   * @param {Object} userInfo - Informações do usuário
   */
  setCurrentUser(userInfo) {
    try {
      localStorage.setItem(this.currentUserKey, JSON.stringify(userInfo));
      localStorage.setItem('isLoggedIn', 'true');
    } catch (error) {
      console.error('Erro ao salvar usuário atual:', error);
    }
  }

  /**
   * Retorna o usuário atual logado
   * @returns {Object|null} Usuário atual ou null
   */
  getCurrentUser() {
    try {
      const userInfo = localStorage.getItem(this.currentUserKey);
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (isLoggedIn && userInfo) {
        return JSON.parse(userInfo);
      }
      return null;
    } catch (error) {
      console.error('Erro ao buscar usuário atual:', error);
      return null;
    }
  }

  /**
   * Verifica se há usuário logado
   * @returns {boolean} True se há usuário logado
   */
  isUserLoggedIn() {
    return this.getCurrentUser() !== null;
  }

  /**
   * Faz logout do usuário atual
   */
  logout() {
    try {
      localStorage.removeItem(this.currentUserKey);
      localStorage.removeItem('isLoggedIn');
      console.log('Logout realizado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  /**
   * Atualiza dados do usuário
   * @param {number} userId - ID do usuário
   * @param {Object} updateData - Dados para atualizar
   * @returns {Object} Resultado da atualização
   */
  updateUser(userId, updateData) {
    try {
      const users = this.getAllUsers();
      const userIndex = users.findIndex(user => user.id === userId);
      
      if (userIndex === -1) {
        return { 
          success: false, 
          message: 'Usuário não encontrado' 
        };
      }

      // Atualiza apenas campos permitidos
      const allowedFields = ['name', 'email', 'password'];
      const updatedUser = { ...users[userIndex] };
      
      for (const field of allowedFields) {
        if (updateData[field] !== undefined) {
          updatedUser[field] = updateData[field];
        }
      }

      updatedUser.updatedAt = new Date().toISOString();
      users[userIndex] = updatedUser;
      
      localStorage.setItem(this.storageKey, JSON.stringify(users));
      
      return { 
        success: true, 
        message: 'Usuário atualizado com sucesso!',
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role
        }
      };
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return { 
        success: false, 
        message: 'Erro interno. Tente novamente.' 
      };
    }
  }

  /**
   * Remove todos os usuários (para testes/desenvolvimento)
   * CUIDADO: Esta função apaga todos os dados!
   */
  clearDatabase() {
    try {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.currentUserKey);
      localStorage.removeItem('isLoggedIn');
      this.initializeDatabase();
      console.log('Banco de dados limpo e reinicializado');
    } catch (error) {
      console.error('Erro ao limpar banco:', error);
    }
  }

  /**
   * Exporta todos os usuários (para backup/debug)
   * @returns {string} JSON com todos os usuários
   */
  exportUsers() {
    const users = this.getAllUsers();
    return JSON.stringify(users, null, 2);
  }

  /**
   * Importa usuários de um JSON (para restore/debug)
   * @param {string} jsonData - JSON com dados dos usuários
   * @returns {Object} Resultado da importação
   */
  importUsers(jsonData) {
    try {
      const users = JSON.parse(jsonData);
      
      if (!Array.isArray(users)) {
        return { 
          success: false, 
          message: 'Formato de dados inválido' 
        };
      }

      localStorage.setItem(this.storageKey, JSON.stringify(users));
      
      return { 
        success: true, 
        message: `${users.length} usuários importados com sucesso!` 
      };
    } catch (error) {
      console.error('Erro ao importar usuários:', error);
      return { 
        success: false, 
        message: 'Erro ao processar dados' 
      };
    }
  }

  /**
   * Retorna estatísticas dos usuários
   * @returns {Object} Estatísticas
   */
  getStats() {
    const users = this.getAllUsers();
    const activeUsers = users.filter(user => user.isActive);
    const admins = users.filter(user => user.role === 'admin');
    
    return {
      totalUsers: users.length,
      activeUsers: activeUsers.length,
      admins: admins.length,
      regularUsers: users.length - admins.length
    };
  }
}

// Exporta uma instância única (singleton pattern)
// Isso garante que todos os componentes usem a mesma instância
const userDatabase = new UserDatabase();

export default userDatabase;

// Para debug no console do navegador (opcional)
if (typeof window !== 'undefined') {
  window.userDatabase = userDatabase;
  console.log('UserDatabase disponível globalmente como window.userDatabase');
  console.log('Usuários padrão:', userDatabase.getAllUsers().map(u => ({ email: u.email, password: u.password })));
}